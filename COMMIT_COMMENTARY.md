# The Commit Messages Deserve Their Own Museum

An annotated selection from the surviving RealtAsia development history.

This is not a changelog, and it is not an attempt to make old commit messages obey modern conventions after the fact. The messages are part of the artefact. They show a live system being designed, deployed, broken, repaired and occasionally addressed as though Git were the only colleague still awake.

Dates below are those preserved in the repository history.

---

## 15 February 2013: getting AWS into the building

> **[Added new module kohana aws because the sdk version 2.0 does not included SES functionality](https://github.com/realtasia/common-rta/commit/c17a017b3ae99a67b67df5e6378eee15c9082e63)**  
> 08:40

The wording is rough; the engineering problem is precise. RealtAsia needed Amazon SES, the available SDK path did not provide it in the required form, and the integration layer had to be changed.

Then Git begins recording the emotional portion of dependency management.

> **[adding aws now?](https://github.com/realtasia/common-rta/commit/e033b0c49fd17b84a275f7146b9baa4fa6a3824e)**  
> 08:44

The question mark is doing extraordinary work. This commit mostly removes accidentally committed repository configuration. AWS is not, in fact, being added now.

> **[adding now](https://github.com/realtasia/common-rta/commit/695f67a595da02115857a751196c0be780fef485)**  
> 08:47

This time the old AWS SDK actually arrives. Hundreds of vendor files enter the repository with all the subtlety of a delivery lorry reversing through the front door.

> **[finally committing aws](https://github.com/realtasia/common-rta/commit/77c2740bda9d52b3d3136e30ae88a53d162707c3)**  
> 08:48

Four commits. Eight minutes. One complete dramatic structure.

The final commit adds the Kohana wrapper and configuration surface exposing SES, S3, EC2, CloudFront, SQS, SNS and the other services available through the period AWS SDK. The sequence is funny because it is honest, but it also captures something historically useful: cloud integration was still sufficiently awkward that simply getting the correct SDK into a PHP framework was an engineering event.

---

## 18 February 2013: discovering a service boundary mid-commit

> **[Made changes to Queue module, then decided it should be it's own app.](https://github.com/realtasia/common-rta/commit/c54b6358066a711b9ddb8a3c68414560cb0df874)**

This may be the most architecturally revealing commit message in the repository.

The diff is not merely tidying a module. It works on job claiming, notification recipient processing, batch email construction and SES delivery. While doing that, the author recognises that background processing has a different runtime lifecycle from the web application.

So the queue becomes its own application.

That is a service boundary being discovered from operational behaviour rather than drawn optimistically on a whiteboard. The dedicated `queue-rta` repository, its daemons and its deployment lifecycle all follow from this decision.

The apostrophe was less successfully separated.

---

## 7 March 2013: “Lots of changes”

> **[Lots of changes. Updated ticker functionality and created a new module for it. Added more comments to RT core model files.](https://github.com/realtasia/common-rta/commit/1b3fab42c2322752ce526665e90894e695a8b571)**

“Lots of changes” is technically accurate in the same way that “some weather” describes a typhoon.

This commit establishes Ticker as a distinct module. Ticker was the materialised-feed engine for RealtAsia: it distributed posts to the feeds of people following an author or page, retained per-user visibility and privacy state, and adjusted relevance when activity occurred.

The surrounding model changes also move derived presentation data towards serialisation rather than mutating persisted documents during reads. Beneath the casual message is a recognisable architectural consolidation: the feed becomes an explicit projection instead of an accidental property of post queries.

---

## 26 August 2013: a small large change with a written warning label

> **[A minor but huge change made to allowing admins to access information. @todo come back and have a look at this](https://github.com/realtasia/common-rta/commit/d0fc5b755c43ceaf95008f96775f64230eae403d)**

The change adds an administrative mode to user serialisation so authorised application code can retain fields normally stripped from public responses.

The code comments are even less coy:

> “Yes this is a privacy flaw and not very secure, but I need a quick fix.”

This is not presented as exemplary access-control design. Its value is evidential. It is the handwriting of a production system under pressure: the author knows exactly which boundary is being weakened, marks it explicitly, contains the exception behind a flag, and leaves a return address for his future self.

“A minor but huge change” is also an admirably compact definition of most security work.

---

## 29 August 2013: two incidents, one commit message

> **[Tried to add a google closure minifier to assets. Work not complete. Comments were creating unsual line breaks. fixed](https://github.com/realtasia/common-rta/commit/e95f45d52bf4c184592caee624f7e0fd9e2b41dc)**

This message declines to pretend the commit has a theme.

Experiment with Closure Compiler: incomplete.  
Unexpected comment formatting: fixed.

Modern history-cleaning advice would split this into separate commits and replace the message with two immaculate imperatives. That would also remove the useful truth: one person was moving across the entire product, encountered a visible production defect while working on asset tooling, and fixed the thing that mattered first.

Even “unsual” survived. Quite right too.

---

## 7 February 2014: notifications become channel-independent records

> **[Created notifications worker that creates a collection of dual serving docs for notifications in-app and emails. cleaned up emails](https://github.com/realtasia/common-rta/commit/1a2bd9e008f58aa7a307b2b3a2585e0c57f31295)**

“Dual serving docs” is compact language for an important redesign.

Previously, the processing path was substantially organised around constructing email. This commit introduces notification documents as the durable product concept. Each record can serve the in-application interface and the email worker independently, with separate delivery status.

It also introduces the notification processor, notification model and publishing boundary, while changing the job processor from `make_emails` to `make_notifications`.

That rename describes the architectural move rather well:

```text
interaction → notification → chosen delivery channels
```

Email stops being the event. It becomes one possible consequence of the event.

The commit also contains stray debug prose embedded in comments and calls the processor twice in one path. Historical source code is wonderfully resistant to retrospective sainthood.

---

## 14 February 2014: Valentine's Day, but for sockets

> **[Created notification classes for sockets, updated plupload to newer version](https://github.com/realtasia/common-rta/commit/80dc4cdf8aae585a35ce2f768bb42949609599ad)**

The durable notification system gains immediate delivery through a separate Socket.IO service. PHP publishes a notification to a recipient channel; the Node service delivers it when that user is connected.

Also, Plupload gets updated.

Once again, the commit message combines a major platform capability with dependency housekeeping as if both had merely been encountered on the way to lunch.

---

## 17 February 2014: deployment acknowledges the workers

> **[Changes to the queue repository should restart upstart services](https://github.com/realtasia/common-rta/commit/4f171559212158e3d5a27dccf5de0fbb4c17e8fc)**

The deployment hook now restarts:

- `rtanotify`
- `rtaticker`
- `rtaemail`

This small commit proves that these were not decorative classes waiting for somebody to finish the product. They were operating services with process lifecycles that had to be restarted after deployment.

It is three lines of shell execution carrying a surprising amount of historical weight.

---

## 19 February 2014: the database migration, in stereo

> **[Changed mongo servers again](https://github.com/realtasia/common-rta/commit/b18bce0bed7606e7ebcdecc163d1cd522b6e799e)**  
> 22:49

> **[Changed mongo servers again](https://github.com/realtasia/common-rta/commit/0fd14448c7cb5f1fb44437e80f740b02af1b1306)**  
> 23:00

Eleven minutes apart.

No commentary can improve upon the decision to use exactly the same message twice, including “again”. The repository does not disclose whether the second “again” refers to the first “again” or to the longer metaphysical history of MongoDB infrastructure.

It does disclose an actively operated system being pointed between database hosts late at night.

---

## 26 February 2014: radical candour

> **[Created a terrible bug](https://github.com/realtasia/common-rta/commit/d64701b8b7efffbb71f2d426469af69a98647537)**

One file. Four substantive lines changed.

The deployment factory had been using `$repo` both for the name of a repository class and for the instantiated object. The diff separates those meanings into `$repo` and `$Crepo`, then runs and returns the instance.

The message says the commit created a terrible bug; the diff looks like an attempt to escape one. Either interpretation is acceptable. What matters is that “misc fixes” was available and consciously rejected.

Later that day:

> **[Fixed ipn class to check for previous transaction id before storing a payment](https://github.com/realtasia/common-rta/commit/b9904a3e1ffc9a1fc77d5e20abab65e29dcc9f6c)**

This one is almost disappointingly professional. The PayPal listener gains a uniqueness check before persisting a transaction, protecting account activation from duplicate payment callbacks.

Apparently there were limits to how amusing a commit could be when money was involved.

---

## What this history shows

The charm of these messages is not that they are chaotic. It is that they are unusually direct.

Across them, the architecture visibly develops:

1. AWS and SES are integrated.
2. Background work becomes its own deployed application.
3. The personalised feed becomes a dedicated projection module.
4. Notifications become durable, channel-independent records.
5. Socket delivery is attached to those records.
6. Deployment learns about the workers.
7. Production infrastructure moves underneath the system.
8. Payment handling gains idempotency protection.

The commit messages provide the running internal monologue:

> adding aws now?  
> adding now  
> finally committing aws  
> Changed mongo servers again  
> Created a terrible bug

There is no polished corporate narrative here. There is something better: a contemporaneous record of an engineer finding the system's boundaries by building and operating it.
