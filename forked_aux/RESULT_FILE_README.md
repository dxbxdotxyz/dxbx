➜  AUX_DEPLOY_DEVNET 
➜  AUX_DEPLOY_DEVNET 
➜  AUX_DEPLOY_DEVNET 
➜  AUX_DEPLOY_DEVNET 
➜  AUX_DEPLOY_DEVNET 
➜  AUX_DEPLOY_DEVNET cd aux-exchange/aptos 
➜  aptos git:(main) ✗ ls
Cargo.lock  Cargo.toml  abort-only-contract  api  config.yaml  contract  rustfmt.toml  target  testing
➜  aptos git:(main) ✗ go run ./go-util/aptos/cmd/calculate-resource-address -a "0x6071254b8c2e2f3f9543a21420b39b68feac32d66145e7f218fdec8cf2f80f2c" -s aux
stat /home/x123/AUX_DEPLOY_DEVNET/aux-exchange/aptos/go-util/aptos/cmd/calculate-resource-address: directory not found
➜  aptos git:(main) ✗ cd ..
➜  aux-exchange git:(main) ✗ pwd
/home/x123/AUX_DEPLOY_DEVNET/aux-exchange
➜  aux-exchange git:(main) ✗ go run ./go-util/aptos/cmd/calculate-resource-address -a "0x6071254b8c2e2f3f9543a21420b39b68feac32d66145e7f218fdec8cf2f80f2c" -s aux
source address: 0x6071254b8c2e2f3f9543a21420b39b68feac32d66145e7f218fdec8cf2f80f2c
seed: aux
resource address: 0x8cbd7347ea84a549d3fb6a3a4579ce56b4057edc52d85f06e14a7864dab67662
➜  aux-exchange git:(main) ✗ # set aptos to use global profile
aptos config set-global-config --config-type global
{
  "Result": {
    "config_type": "Global",
    "default_prompt_response": "Prompt"
  }
}
➜  aux-exchange git:(main) ✗ go run ./go-util/aptos/cmd/setup-aux --network devnet                    
Validator is running at https://fullnode.devnet.aptoslabs.com/v1
deleting folder /home/x123/.move
publish deployer in aptos/contract/deployer
Compiling, may take a little while to download git dependencies...
FETCHING GIT DEPENDENCY https://github.com/aptos-labs/aptos-core.git
INCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
BUILDING deployer
package size 2731 bytes
{
  "Result": {
    "transaction_hash": "0xa5685f28ffee929229c2d5319eeff7963cce3357a55186d69034db692c721881",
    "gas_used": 2147,
    "gas_unit_price": 100,
    "sender": "6071254b8c2e2f3f9543a21420b39b68feac32d66145e7f218fdec8cf2f80f2c",
    "sequence_number": 4,
    "success": true,
    "timestamp_us": 1691817976787370,
    "version": 255656,
    "vm_status": "Executed successfully"
  }
}
publish aux in aptos/contract/auxexch
cannot find create-resource-account-and-publish in path, use cargo
   Compiling libc v0.2.135
   Compiling proc-macro2 v1.0.47
   Compiling typenum v1.15.0
   Compiling memchr v2.5.0
   Compiling num-traits v0.2.15
   Compiling anyhow v1.0.65
   Compiling crunchy v0.2.2
   Compiling lock_api v0.4.9
   Compiling proc-macro2 v0.4.30
   Compiling bit-set v0.5.3
   Compiling radium v0.6.2
   Compiling futures-core v0.3.24
   Compiling getrandom v0.2.7
   Compiling generic-array v0.14.6
   Compiling jobserver v0.1.25
   Compiling quote v1.0.21
   Compiling tempfile v3.3.0
   Compiling quote v0.6.13
   Compiling aho-corasick v0.7.19
   Compiling num-integer v0.1.45
   Compiling syn v1.0.102
   Compiling rand_core v0.6.4
   Compiling ahash v0.7.6
   Compiling cc v1.0.73
   Compiling wait-timeout v0.2.0
   Compiling rand_chacha v0.3.1
   Compiling rand_xorshift v0.3.0
   Compiling rusty-fork v0.3.0
   Compiling digest v0.9.0
   Compiling hashbrown v0.12.3
   Compiling syn v0.15.44
   Compiling bitvec v0.20.4
   Compiling regex v1.6.0
   Compiling num-bigint v0.4.3
   Compiling num-iter v0.1.43
   Compiling num-complex v0.4.2
   Compiling uint v0.9.5
   Compiling rand v0.8.5
   Compiling block-buffer v0.9.0
   Compiling parking_lot_core v0.9.3
   Compiling indexmap v1.9.1
   Compiling num_cpus v1.13.1
   Compiling sha2 v0.9.9
   Compiling getrandom v0.1.16
   Compiling parking_lot v0.12.1
   Compiling proptest v1.0.0
   Compiling fixed-hash v0.7.0
   Compiling num-rational v0.4.1
   Compiling petgraph v0.5.1
   Compiling rand_core v0.5.1
   Compiling crypto-common v0.1.6
   Compiling signal-hook-registry v1.4.0
   Compiling socket2 v0.4.7
   Compiling time v0.1.44
   Compiling num v0.4.0
   Compiling sha3 v0.9.1
   Compiling proc-macro-error-attr v1.0.4
   Compiling slab v0.4.7
   Compiling futures-channel v0.3.24
   Compiling futures-task v0.3.24
   Compiling rand_chacha v0.2.2
   Compiling ring v0.16.20
   Compiling atty v0.2.14
   Compiling dirs-sys-next v0.1.2
   Compiling uncased v0.9.7
   Compiling crossbeam-utils v0.8.12
   Compiling rand v0.7.3
   Compiling dirs-next v2.0.0
   Compiling libsecp256k1-core v0.3.0
   Compiling block-buffer v0.10.3
   Compiling crypto-mac v0.8.0
   Compiling digest v0.10.5
   Compiling openssl-sys v0.9.76
   Compiling hmac v0.8.1
   Compiling parking_lot_core v0.8.5
   Compiling blst v0.3.10
   Compiling crypto-mac v0.10.1
   Compiling hmac-drbg v0.3.0
   Compiling hmac v0.10.1
   Compiling threadpool v1.8.1
   Compiling dashmap v5.4.0
   Compiling proc-macro-error v1.0.4
   Compiling synstructure v0.12.6
   Compiling libsecp256k1-gen-ecmult v0.3.0
   Compiling libsecp256k1-gen-genmult v0.3.0
   Compiling parking_lot v0.11.2
   Compiling unicode-linebreak v0.1.4
   Compiling inout v0.1.3
   Compiling phf_shared v0.11.1
   Compiling libsecp256k1 v0.7.1
   Compiling openssl v0.10.42
   Compiling cipher v0.4.3
   Compiling hkdf v0.10.0
   Compiling tiny-keccak v2.0.2
   Compiling colored v2.0.0
   Compiling universal-hash v0.5.0
   Compiling native-tls v0.2.10
   Compiling polyval v0.6.0
   Compiling hmac v0.12.1
   Compiling httparse v1.8.0
   Compiling aes v0.8.1
   Compiling ghash v0.5.0
   Compiling ctr v0.9.2
   Compiling phf_generator v0.11.1
   Compiling internment v0.5.6
   Compiling sha2 v0.10.6
   Compiling serde_derive v1.0.145
   Compiling thiserror-impl v1.0.37
   Compiling impl-trait-for-tuples v0.2.2
   Compiling derive_arbitrary v1.2.1
   Compiling ref-cast-impl v1.0.12
   Compiling variant_count v1.1.0
   Compiling tracing-attributes v0.1.23
   Compiling tokio-macros v1.8.0
   Compiling proptest-derive v0.3.0
   Compiling futures-macro v0.3.24
   Compiling zeroize_derive v1.3.2
   Compiling ref-cast v1.0.12
   Compiling arbitrary v1.2.0
   Compiling clap_derive v3.2.18
   Compiling ouroboros_macro v0.9.5
   Compiling textwrap v0.15.1
   Compiling thiserror v1.0.37
   Compiling better_typeid_derive v0.1.1
   Compiling zeroize v1.3.0
   Compiling aptos-crypto-derive v0.0.3 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling futures-util v0.3.24
   Compiling openssl-macros v0.1.0
   Compiling tracing v0.1.37
   Compiling curve25519-dalek v3.2.1
   Compiling better_any v0.1.1
   Compiling aead v0.5.1
   Compiling time v0.3.15
   Compiling num-derive v0.3.3
   Compiling phf_codegen v0.11.1
   Compiling clap v3.2.22
   Compiling aes-gcm v0.10.1
   Compiling serde v1.0.145
   Compiling ouroboros v0.9.5
   Compiling x25519-dalek v1.2.0
   Compiling memoffset v0.6.5
   Compiling hkdf v0.12.3
   Compiling phf v0.11.1
   Compiling parse-zoneinfo v0.3.0
   Compiling pest v2.4.0
   Compiling crossbeam-epoch v0.9.11
   Compiling encoding_rs v0.8.31
   Compiling chrono-tz-build v0.0.3
   Compiling async-trait v0.1.57
   Compiling bstr v0.2.17
   Compiling cookie v0.16.1
   Compiling chrono-tz v0.6.3
   Compiling pest_meta v2.4.0
   Compiling crossbeam-deque v0.8.2
   Compiling proc-macro-hack v0.5.19
   Compiling crossbeam-channel v0.5.6
   Compiling bitmaps v2.1.0
   Compiling pest_generator v2.4.0
   Compiling rand_xoshiro v0.6.0
   Compiling lexical-core v0.7.6
   Compiling futures-executor v0.3.24
   Compiling num-traits v0.1.43
   Compiling serde-hjson v0.9.1
   Compiling futures v0.3.24
   Compiling log v0.4.17
   Compiling toml v0.5.9
   Compiling serde_bytes v0.11.7
   Compiling bcs v0.1.4
   Compiling impl-serde v0.3.2
   Compiling serde_json v1.0.86
   Compiling mio v0.8.4
   Compiling chrono v0.4.22
   Compiling move-symbol-pool v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling codespan-reporting v0.11.1
   Compiling ed25519 v1.5.2
   Compiling tokio v1.21.2
   Compiling proc-macro-crate v1.2.1
   Compiling ed25519-dalek v1.0.1
   Compiling fail v0.4.0
   Compiling serde-name v0.1.2
   Compiling codespan v0.11.1
   Compiling bcs v0.1.4 (https://github.com/aptos-labs/bcs.git?rev=d31fab9d81748e2594be5cd5cdf845786a30562d#d31fab9d)
   Compiling url v2.3.1
   Compiling serde_yaml v0.8.26
   Compiling aptos-bitvec v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling want v0.3.0
   Compiling globset v0.4.9
   Compiling serde_urlencoded v0.7.1
   Compiling sized-chunks v0.6.5
   Compiling pest_derive v2.4.0
   Compiling serde-reflection v0.3.6
   Compiling parity-scale-codec-derive v2.3.1
   Compiling ignore v0.4.18
   Compiling im v15.1.0
   Compiling globwalk v0.8.1
   Compiling nom v5.1.2
   Compiling clap v2.34.0
   Compiling rayon v1.5.3
   Compiling include_dir_impl v0.6.2
   Compiling rayon-core v1.9.3
   Compiling structopt-derive v0.4.18
   Compiling ordered-float v2.10.0
   Compiling dirs-sys v0.3.7
   Compiling petgraph v0.6.2
   Compiling include_dir v0.6.2
   Compiling parity-scale-codec v2.3.1
   Compiling serde-value v0.7.0
   Compiling directories v4.0.1
   Compiling impl-codec v0.5.1
   Compiling tera v1.17.1
   Compiling primitive-types v0.10.1
   Compiling tokio-util v0.7.4
   Compiling tokio-native-tls v0.3.0
   Compiling config v0.11.0
   Compiling cookie_store v0.16.1
   Compiling simplelog v0.9.0
   Compiling bincode v1.3.3
   Compiling structopt v0.3.26
   Compiling serde-reflection v0.3.5 (https://github.com/aptos-labs/serde-reflection?rev=839aed62a20ddccf043c08961cfe74875741ccba#839aed62)
   Compiling prometheus v0.13.2
   Compiling h2 v0.3.14
   Compiling move-core-types v0.0.4 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling nom v7.1.1
   Compiling serde-generate v0.20.6 (https://github.com/aptos-labs/serde-reflection?rev=839aed62a20ddccf043c08961cfe74875741ccba#839aed62)
   Compiling ptree v0.4.0
   Compiling crc32fast v1.3.2
   Compiling named-lock v0.2.0
   Compiling move-binary-format v0.0.3 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-command-line-common v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling backtrace v0.3.66
   Compiling include_dir_macros v0.7.3
   Compiling move-ir-types v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling bindgen v0.60.1
   Compiling clang-sys v1.4.0
   Compiling cexpr v0.6.0
   Compiling aptos-gas-algebra-ext v0.0.1 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling flate2 v1.0.24
   Compiling include_dir v0.7.3
   Compiling aptos-metrics-core v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling move-ir-to-bytecode-syntax v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling hyper v0.14.20
   Compiling rustversion v1.0.9
   Compiling tracing-log v0.1.3
   Compiling move-bytecode-verifier v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-bytecode-source-map v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-vm-types v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-read-write-set-types v0.0.3 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-ir-to-bytecode v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-coverage v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-vm-runtime v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-compiler v0.0.1 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-bytecode-utils v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-table-extension v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling hyper-tls v0.5.0
   Compiling aptos-module-verifier v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling reqwest v0.11.12
   Compiling ripemd v0.1.3
   Compiling zstd-sys v2.0.4+zstd.1.5.2
   Compiling libz-sys v1.1.8
   Compiling bzip2-sys v0.1.11+1.0.8
   Compiling object v0.29.0
   Compiling hostname v0.3.1
   Compiling tracing-subscriber v0.3.16
   Compiling strum_macros v0.24.3
   Compiling erased-serde v0.3.23
   Compiling aptos-log-derive v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling rustls v0.20.7
   Compiling darling_core v0.14.1
   Compiling webpki v0.22.0
   Compiling sct v0.7.0
   Compiling crossbeam-queue v0.3.6
   Compiling sha1 v0.10.5
   Compiling multer v2.0.4
   Compiling headers v0.3.8
   Compiling crossbeam v0.8.2
   Compiling ureq v1.5.5
   Compiling tokio-stream v0.1.11
   Compiling poem-derive v1.3.46
   Compiling aptos-logger v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling quick-xml v0.23.1
   Compiling move-disassembler v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling pin-project-internal v1.0.12
   Compiling rfc7239 v0.1.0
   Compiling serde_yaml v0.9.13
   Compiling librocksdb-sys v0.8.0+7.4.4
   Compiling move-model v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling darling_macro v0.14.1
   Compiling tokio-rustls v0.23.4
   Compiling derive_more v0.99.17
   Compiling poem v1.3.46
   Compiling radium v0.5.3
   Compiling enum_dispatch v0.3.8
   Compiling bitvec v0.19.6
   Compiling darling v0.14.1
   Compiling aptos-github-client v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling poem-openapi-derive v2.0.17
   Compiling pin-project v1.0.12
   Compiling move-vm-test-utils v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling read-write-set-dynamic v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling fail v0.5.1
   Compiling aptos-temppath v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-time-service v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling get_if_addrs v0.5.3
   Compiling short-hex-str v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-secure-net v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling move-resource-viewer v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling pbkdf2 v0.4.0
   Compiling ed25519-dalek-bip32 v0.2.0
   Compiling tiny-bip39 v0.8.2
   Compiling move-docgen v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-stackless-bytecode v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-abigen v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-errmapgen v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling scratchpad v1.3.1
   Compiling move-package v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling move-prover-boogie-backend v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling poem-openapi v2.0.17
   Compiling aptos-crypto v0.0.3 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-types v0.0.3 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling move-prover v0.1.0 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling aptos-vault-client v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-openapi v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling move-stdlib v0.1.1 (https://github.com/move-language/move?rev=81d19fce20d73675b7ac129abe6b6797513cc8d0#81d19fce)
   Compiling aptos-state-view v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-sdk-builder v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling scratchpad v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-aggregator v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling mvhashmap v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-framework v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-block-executor v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling package-builder v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-gas v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-vm v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-cached-packages v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling storage-interface v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling rocksdb v0.19.0
   Compiling schemadb v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-secure-storage v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-config v0.1.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-api-types v0.0.1 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-rest-client v0.0.0 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling aptos-sdk v0.0.3 (https://github.com/aptos-labs/aptos-core.git?rev=0377a5f9825110c63b741b0a6d735ff6b4f945b7#0377a5f9)
   Compiling util_for_aptos v0.1.0 (/home/x123/AUX_DEPLOY_DEVNET/aux-exchange/aptos/contract/util-for-aptos)
   Compiling deployer v0.1.0 (/home/x123/AUX_DEPLOY_DEVNET/aux-exchange/aptos/contract/deployer)
    Finished dev [unoptimized + debuginfo] target(s) in 4m 49s
warning: the following packages contain code that will be rejected by a future version of Rust: nom v5.1.2
note: to see what the problems were, use the option `--future-incompat-report`, or run `cargo report future-incompatibilities --id 1`
     Running `aptos/target/debug/create-resource-account-and-publish -d 6071254b8c2e2f3f9543a21420b39b68feac32d66145e7f218fdec8cf2f80f2c -k 0x30a4d79da6cdfca31abf87ee583ee42e93c080afff637693e0028e2bd4419884 --seed aux -u 'https://fullnode.devnet.aptoslabs.com' -n aux --package-path aptos/contract/auxexch`
Compiling, may take a little while to download git dependencies...
FETCHING GIT DEPENDENCY https://github.com/aptos-labs/aptos-core.git

UPDATING GIT DEPENDENCY https://github.com/aptos-labs/aptos-core.git
INCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
INCLUDING DEPENDENCY deployer
BUILDING aux
resource account is: 8cbd7347ea84a549d3fb6a3a4579ce56b4057edc52d85f06e14a7864dab67662
uploading code at index 0 length 706
uploading code at index 1 length 1315
uploading code at index 2 length 967
uploading code at index 3 length 996
uploading code at index 4 length 1008
uploading code at index 5 length 3460
uploading code at index 6 length 3516
uploading code at index 7 length 11007
uploading code at index 8 length 542
uploading code at index 9 length 4267
uploading code at index 10 length 4673
uploading code at index 11 length 14638
uploading code at index 12 length 1112
uploading code at index 13 length 1155
uploading code at index 14 length 549
uploading code at index 15 length 2131
uploading code at index 16 length 2054
uploading code at index 17 length 5332
uploading code at index 18 length 2307
uploading code at index 19 length 6467
uploading code at index 20 length 2579
uploading code at index 21 length 3713
uploading code at index 22 length 10097
uploading code at index 23 length 2394
uploading code at index 24 length 12494
uploading code at index 25 length 2937
uploading code at index 26 length 5527
finished uploading code, now publish
Done. Hope you enjoy aux exchange
➜  aux-exchange git:(main) ✗ 
➜  aux-exchange git:(main) ✗ 
➜  aux-exchange git:(main) ✗ 