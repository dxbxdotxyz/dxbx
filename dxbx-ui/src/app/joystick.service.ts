import { Injectable,OnInit } from '@angular/core';
import { Subject, iif } from 'rxjs';
//import{LocalStorageServiceService} from './local-storage-service.service';

//import{GlobalVariables}from './hfc-data.model'

export interface JoystickInputs {
    button : {
        A: boolean,
        B: boolean,
        X: boolean,
        Y: boolean,
        RJ: boolean,//Right joystick click
        LJ: boolean,
        UP: boolean,//For the joystick these are axes, but to me they are buttons
        DOWN: boolean,
        RIGHT: boolean,
        LEFT: boolean,
        RB: boolean,
        LB: boolean,
        START: boolean,//right
        SELECT: boolean//left
    },
    axis : {
        RX : number,
        RY : number,//inverted
        LX : number,
        LY : number,//inverted
        RT : number,//value : 0 to 1
        LT : number//value : 0 to 1
    }
}

export interface JoysticksEvent {
    type : string,//'pressed', 'released', 'hold', 'axis', 'axisReachedLimit'
    name : string,
    value ?: number,
    duration ?: number //for buttons, when it was pressed
}

@Injectable({
    providedIn: 'root'
})
export class JoystickService implements OnInit {
    private joystickID=0;

    private intervalID : any;
    private pressedDates = { A: 0, B: 0, X: 0, Y: 0, RJ: 0, LJ: 0, UP: 0, DOWN: 0, RIGHT: 0, LEFT: 0, RB: 0, LB: 0, START: 0, SELECT: 0 }
    private eventsSubject : Subject<JoysticksEvent[]> = new Subject<JoysticksEvent[]>();

    public lastState : JoystickInputs = {
        button : { A: false, B: false, X: false, Y: false, RJ: false, LJ: false, UP: false, DOWN: false, RIGHT: false, LEFT: false, RB: false, LB: false, START: false, SELECT: false},
        axis : { RX : 0, RY : 0, LX : 0, LY : 0, RT : 0, LT : 0}
    }

    private mappingCodes = {
        xboxLinux : 0,
        xinput : 1,
        ps4 : 2
    }
    private mapping : number=0;

    public updatePeriod = 0.05//seconds

    private isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    constructor() {

        this.joystickID =0;
        this.mapping = this.mappingCodes.ps4;
     }

     ngOnInit(): void {
      // window.addEventListener("gamepadconnected", (e : any) => this.gamepadConnected(e.gamepad));
       this.EnableGamepad()      ;


     }

    public gamepadConnected(gamepad : any){
        console.log("Controller connected at index %d: %s. %d buttons, %d axes.",
                        gamepad.index, gamepad.id,
                        gamepad.buttons.length, gamepad.axes.length);

            console.log("Controller connected2  ",
                        gamepad.id);



        if(gamepad.id.toLowerCase().includes("xinput") || gamepad.id == "Microsoft Controller (STANDARD GAMEPAD Vendor: 045e Product: 0b12)" ){
            console.log("Controller detected1 : xinput")
            this.mapping = this.mappingCodes.xinput
        }else if( gamepad.id.toLowerCase().includes("8bitdo")){
            console.log("Controller detected2 : PS4")
            //this.mapping = this.mappingCodes.ps4;

            
            if(this.isMobile){
                this.mapping = this.mappingCodes.xinput
            } else {
                this.mapping = this.mappingCodes.ps4;
            }
        }
        else{
            console.log("Controller detected3 : Xbox Linux")
            this.mapping = this.mappingCodes.xboxLinux
        }
    }

    public gamepadDisconnected(){
        clearInterval(this.intervalID)
    }

    public DisableGamepad(){
        clearInterval(this.intervalID)
    }

    public EnableGamepad(){
        if(navigator.getGamepads()[this.joystickID] != undefined){
            this.intervalID = setInterval(() => {
                this.readGamepad()
            }, 1000*this.updatePeriod);
            this.vibrate()
            return true
        }
        else return false
    }

    public getObservable = () => {
        return this.eventsSubject.asObservable()
    }

    public vibrate(duration=100, weak=1.0, strong=0){
        var gamepad : any;
        gamepad = navigator.getGamepads()[this.joystickID]
        if(gamepad.vibrationActuator != undefined)
            gamepad.vibrationActuator.playEffect("dual-rumble", {
                startDelay: 0,
                duration: duration,
                weakMagnitude: weak,
                strongMagnitude: strong
                })
    }

    private readGamepad(){
        var state : JoystickInputs = {
            button : { A: false, B: false, X: false, Y: false, RJ: false, LJ: false, UP: false, DOWN: false, RIGHT: false, LEFT: false, RB: false, LB: false, START: false, SELECT: false},
            axis : { RX : 0, RY : 0, LX : 0, LY : 0, RT : 0, LT : 0}
        }

        //todo i had to change tsconfig.json to get rid of the error !!AAARGH
        // "strict": false,
        // "strictNullChecks":false,

        //if(navigator.getGamepads()[this.joystickID]!==null)
        const  gamepad   = navigator.getGamepads()[this.joystickID] ;
        const trigger = 0.2
      
        switch(this.mapping){
            case this.mappingCodes.xboxLinux:
                state.button.A = gamepad.buttons[0].pressed
                state.button.B = gamepad.buttons[1].pressed
                state.button.X = gamepad.buttons[2].pressed
                state.button.Y = gamepad.buttons[3].pressed
                state.button.LB = gamepad.buttons[4].pressed
                state.button.RB = gamepad.buttons[5].pressed
                state.button.SELECT = gamepad.buttons[8].pressed
                state.button.START = gamepad.buttons[9].pressed
                state.button.LJ = gamepad.buttons[10].pressed
                state.button.RJ = gamepad.buttons[11].pressed
                state.button.UP = gamepad.buttons[12].pressed
                state.button.DOWN = gamepad.buttons[13].pressed
                state.button.LEFT = gamepad.buttons[14].pressed
                state.button.RIGHT = gamepad.buttons[15].pressed
                state.axis.LX = Math.abs(gamepad.axes[0]) > trigger ? gamepad.axes[0] : 0
                state.axis.LY = Math.abs(gamepad.axes[1]) > trigger ? -gamepad.axes[1] : 0
                state.axis.RX = Math.abs(gamepad.axes[2]) > trigger ? gamepad.axes[2] : 0
                state.axis.RY = Math.abs(gamepad.axes[3]) > trigger ? -gamepad.axes[3] : 0
                state.axis.LT = gamepad.buttons[6].value
                state.axis.RT = gamepad.buttons[7].value


            break;
            case this.mappingCodes.xinput:
                state.button.A = gamepad.buttons[0].pressed
                state.button.B = gamepad.buttons[1].pressed
                state.button.X = gamepad.buttons[2].pressed
                state.button.Y = gamepad.buttons[3].pressed
                state.button.LB = gamepad.buttons[4].pressed
                state.button.RB = gamepad.buttons[5].pressed
                state.button.SELECT = gamepad.buttons[8].pressed
                state.button.START = gamepad.buttons[9].pressed
                state.button.LJ = gamepad.buttons[10].pressed
                state.button.RJ = gamepad.buttons[11].pressed
                state.button.UP = gamepad.buttons[12].pressed
                state.button.DOWN = gamepad.buttons[13].pressed
                state.button.LEFT = gamepad.buttons[14].pressed
                state.button.RIGHT = gamepad.buttons[15].pressed
                state.axis.LX = Math.abs(gamepad.axes[0]) > trigger ? gamepad.axes[0] : 0
                state.axis.LY = Math.abs(gamepad.axes[1]) > trigger ? -gamepad.axes[1] : 0
                state.axis.RX = Math.abs(gamepad.axes[2]) > trigger ? gamepad.axes[2] : 0
                state.axis.RY = Math.abs(gamepad.axes[3]) > trigger ? -gamepad.axes[3] : 0
                state.axis.LT = gamepad.buttons[6].value
                state.axis.RT = gamepad.buttons[7].value
            break;
            case this.mappingCodes.ps4:
                state.button.A = gamepad.buttons[0].pressed;
                state.button.B = gamepad.buttons[1].pressed;;
                state.button.X = gamepad.buttons[3].pressed;;
                state.button.Y = gamepad.buttons[4].pressed;;
                state.button.LB = gamepad.buttons[6].pressed;
                state.button.RB = gamepad.buttons[7].pressed;
                state.button.SELECT = gamepad.buttons[10].pressed;
                state.button.START = gamepad.buttons[11].pressed;
                state.button.LJ = gamepad.buttons[8].pressed;
                state.button.RJ = gamepad.buttons[9].pressed;
                // state.button.UP = gamepad.buttons[12].pressed;
                // state.button.DOWN = gamepad.buttons[13].pressed;
                // state.button.LEFT = gamepad.buttons[14].pressed;
                // state.button.RIGHT = gamepad.buttons[15].pressed;
                // state.axis.LX = Math.abs(gamepad.axes[0]) > trigger ? gamepad.axes[0] : 0;
                // state.axis.LY = Math.abs(gamepad.axes[1]) > trigger ? -gamepad.axes[1] : 0;
                // state.axis.RX = Math.abs(gamepad.axes[2]) > trigger ? gamepad.axes[2] : 0;
                // state.axis.RY = Math.abs(gamepad.axes[3]) > trigger ? -gamepad.axes[3] : 0;
                // state.axis.LT = gamepad.buttons[6].value;
                // state.axis.RT = gamepad.buttons[7].value;
            break;

           

        }


        var events : JoysticksEvent[] = []

        //check changes and holds
        for(var button in state.button){
            if(state.button[button] != this.lastState.button[button]){//Change
                events.push({   type: state.button[button] ? "pressed" : "released",
                                name: button,
                                duration: 0})
                if(state.button[button]) this.pressedDates[button] = Date.now()
            }
            else if(state.button[button]){//Hold
                if(Date.now() > this.pressedDates[button] + 500) //Hold long enough
                    events.push({   type: "hold",
                                    name: button,
                                    duration: Date.now()-this.pressedDates[button]})
            }
        }

        for(var axis in state.axis){
            if(state.axis[axis] != 0){
                //special case for left joystick: keep only one axis, the greater value
                if(axis == "LX" && Math.abs(state.axis.LY) > Math.abs(state.axis.LX)) {
                    ;
                }
                else if(axis == "LY" && Math.abs(state.axis.LX) > Math.abs(state.axis.LY)) {
                    ;
                }
                else
                    events.push({   type: "axis",
                                    name: axis,
                                    value: state.axis[axis]})
            }


            if(Math.abs(state.axis[axis]) == 1 && Math.abs(this.lastState.axis[axis]) != 1)
                events.push({   type: "axisReachedLimit",
                                name: axis,
                                value: state.axis[axis]})
        }

        if(events.length) {
          this.eventsSubject.next(events)
          console.log("Controller ", JSON.stringify(events))
        }

        this.lastState = state
    }

}
