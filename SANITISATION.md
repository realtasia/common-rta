# common-rta sanitisation record

This is modern editorial material for the 2026 realTasia archive.

## Publication model

The public repository preserves the historical commit sequence, messages, dates and authors, with detected historical credential values redacted from file contents. The untouched private `pipewrk/common-rta` repository remains the archival master. The snapshot changes are described separately below.

## Historical credential redactions

Detected AWS access IDs and associated secret values, credential and token values in configuration, source, and examples, private-key test fixtures were replaced with explicit redaction markers throughout the public history. The surrounding files, commit sequence and commit metadata remain. This includes values that GitHub push protection identified; fixture keys are marked as such here without treating them as evidence of active credentials.

The following commits introduced or changed detected values. The first identifier refers to the private source; the link opens the rewritten public commit. Later commit IDs may also differ because their ancestry changed.

| Original commit | Public commit | Original message |
|---|---|---|
| `2278305` | [`dd5d24c`](https://github.com/realtasia/common-rta/commit/dd5d24c792640cdb23d0b88352de2d79de000c8a) | Initial commit of common files |
| `49b96a4` | [`e0d1f3a`](https://github.com/realtasia/common-rta/commit/e0d1f3abc95a41841b4ff349eb3f220e202c573b) | More clean up. Added RT global constants |
| `3f53821` | [`eb91415`](https://github.com/realtasia/common-rta/commit/eb914159c39970b53a0e16f3db7f0642f10c07b6) | Trying to solve Method not found (AWS) problem |
| `acd3ab2` | [`96dc084`](https://github.com/realtasia/common-rta/commit/96dc084d9837c056dd430beefcee4f53c9acef45) | Changing the way emails are constructed and sent |
| `e6ae7ab` | [`3b475cb`](https://github.com/realtasia/common-rta/commit/3b475cb3147fb66830e6fde28d48064b6a606bf5) | Cleaned up AWS helper class, re-compiled JS libs to latest versions |
| `c948cdf` | [`71b7223`](https://github.com/realtasia/common-rta/commit/71b72238d1ed60ed8a4bd6be7555b25e0c65ba6c) | QRCOde module was missing |
| `d2a8147` | [`efeb6e4`](https://github.com/realtasia/common-rta/commit/efeb6e49b93306d4c5dcc62dab5f0f534c47c3b5) | Finalised RT config variables |
| `810ef9b` | [`4ee63ae`](https://github.com/realtasia/common-rta/commit/4ee63aecf0319f3fb14969650a8a85fb56cdbcbd) | Corrected Swiftmailer AWS credentials source |
| `bc28129` | [`b2aa402`](https://github.com/realtasia/common-rta/commit/b2aa40290613557c7784aaa789a15af8b36bbfc8) | Attempting to solve the dynamodb bug |
| `90a773c` | [`81ca6d3`](https://github.com/realtasia/common-rta/commit/81ca6d3d283b107b9718e4104dfe99111e3bd6e4) | Updated AWS creds |
| `2a769f5` | [`1fbce47`](https://github.com/realtasia/common-rta/commit/1fbce4793e41380217fee774fb30706ced155cc8) | Updated URLS for https and new Keys/Endpoints |

Affected paths:

- `kohana/composer/mailgun/mailgun-php/tests/Mailgun/Tests/MailgunTest.php`
- `kohana/composer/swiftmailer/swiftmailer/tests/_samples/dkim/dkim.test.priv`
- `kohana/composer/swiftmailer/swiftmailer/tests/_samples/smime/ca.key`
- `kohana/composer/swiftmailer/swiftmailer/tests/_samples/smime/encrypt.key`
- `kohana/composer/swiftmailer/swiftmailer/tests/_samples/smime/encrypt2.key`
- `kohana/composer/swiftmailer/swiftmailer/tests/_samples/smime/intermediate.key`
- `kohana/composer/swiftmailer/swiftmailer/tests/_samples/smime/sign.key`
- `kohana/composer/swiftmailer/swiftmailer/tests/_samples/smime/sign2.key`
- `kohana/modules/RT/classes/amazonsdk.php`
- `kohana/modules/RT/classes/asdk.php`
- `kohana/modules/RT/config/amazon.php`
- `kohana/modules/RT/init-live.php`
- `kohana/modules/RT/init.php`
- `kohana/modules/email/config/email.php`
- `kohana/modules/email/vendor/swiftmailer/test-suite/lib/simpletest/docs/source/en/speakers_coaches_consultancy.xml`
- `kohana/modules/facebook/config/facebook.php`
- `kohana/modules/facebook/vendor/examples/example.php`
- `kohana/modules/facebook/vendor/examples/with_js_sdk.php`
- `kohana/modules/facebook/vendor/tests/tests.php`
- `kohana/modules/kaws/vendor/aws-sdk-for-php/config.inc.php`
- `kohana/modules/user/vendor/recaptcha/example-captcha.php`
- `kohana/modules/user/vendor/recaptcha/example-mailhide.php`

## Snapshot changes

| Category | Treatment | Reason | Behavioural effect |
|---|---|---|---|
| realTasia-owned AWS, SMTP, MongoDB, client, endpoint and integration values | Exact operational literals replaced with type-compatible synthetic values | Credentials, account identifiers and private topology must not be public | Original integrations require new configuration |
| Bundled TeamViewer installer | Omitted | It is unrelated proprietary binary material with no archival redistribution basis | No realTasia source behaviour is affected |
| Third-party mail and cryptography test fixtures | Omitted | Bundled examples contained credential-shaped API strings and private-key fixtures with no architectural value | Vendor test suites are incomplete; realTasia runtime code is unaffected |

[`THIRD_PARTY.md`](./THIRD_PARTY.md) records unresolved dependency and asset classes retained for historical study. Public visibility does not represent rights clearance or grant reuse rights.

`COMMIT_COMMENTARY.md` is contemporary analysis. Its links point to the corresponding public historical commits.

## Rights

No open-source licence is granted for this repository as a whole. Historical third-party notices continue to govern the files they cover. All other rights are reserved.
