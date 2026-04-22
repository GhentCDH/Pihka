# Pihka - Sustainable data publication platform

## Abstract



## Introduction

The result of many digital humanities research projects are captured a research database or data set. Researchers can spend years to compile lists of annotations, historical social networks, meta-data on coin-finds, ... The research data should far outlive the of the research project itself. 

The data *afterlive* can take several forms. A static dump on a research data platforms which makes the data reusable is already a good practice. Unfortunately static data dumps are not very attractive. Browsing, filtering or searching in a static data dump is not straightforward. Getting a feel for what is included in the data is difficult.

An alternative is to keep a  software environment alive where data can be accessed, browsed and queried. The reality of hosting databases, back-ends, microservices, or other 'live' services, is that there are *costs associated with maintenance*: upkeep, security upgrades, monitoring, … Costs that should be avoided since the reality of project funding is that, once a project is completed, there is effectively no budget for maintenance. Having a budget of zero combined with real running costs are not sustainable. Over time, the result is a graveyard of DH-projects and inaccessible research data.

The reality of *zero maintenance budget should be an integral part of* *the design of sustainable data publication software*. There is a need for a platform which goes beyond a static data dump and presents data in an attractive way with functionality expected for a data publishing platform: faceted search, full text search, data exploration, extendable data visualisation while keeping maintenance costs near zero. This paper presents a set of design choices for a sustainable data publication platform together with an implementation in the form of the Pihka platform. A secondary contribution are the good practices for sustainable software in general.


## Sustainable software


Sustainable software Some hallmarks of sustainable software systems in general 

* Accessible Documentation
* Ease of deployment - migration
* Only strategic dependencies on other software and no dependencies on external services
* Low cost to keep running: zero-back-end.

The Endings project principles 2.2.1 are taken into account while designing Phika. We do add a list to technologies to use with SQLite which is a archive standard and has several open-source implementations in different programming languages.

Assumptions are that read only, data publishing, data exploration, data description. Limited size database.


## Pihka software architecture

Pikah means resin in Finnish. The metaphor used here is that resin captures the data allows it to survive until far into the future. The Finnish name refers to inspiration for this project: Sampo-UI a project which visualizes DH data using SPARQL endpoints. 


Pihka should not optimize for bandwidth but for ease of use, clarity and dependency limitation. 

### Javascript programming language


Browser as a stable platform with a good backwards compatibility track-record.

QuickJS


Bundleless Javascript  Modern javascript libraries like react, vue, lit offer a great deal of functionality but this comes at a cost of an explosion of dependencies on bundlers, ecosystems, tooling . 

We take a radical choice of targeting plain javascript and a limited amount of documented browser APIs which avoids dependencies. The cost is of course that some functionality available in frameworks is duplicated and needs to be maintained by the project itself. Having a clear scope and focus should keep this duplicated functionality in check and protect Pihka against software erosion. 


Examples: 

<https://github.com/steffest/DPaint-js>

<https://playfulprogramming.com/posts/modern-js-bundleless>


Avoiding a build step also avoids deployment issues later on.


M. Wu, W. Dong, Q. Zhao, Z. Pan and B. Hua, "An Empirical Study of Lightweight JavaScript Engines," *2023 IEEE 23rd International Conference on Software Quality, Reliability, and Security Companion (QRS-C)*, Chiang Mai, Thailand, 2023, pp. 413-422, doi: 10.1109/QRS-C60940.2023.00103.\nkeywords: {Codes;Prototypes;Software quality;Software reliability;Engines;Standards;Resilience;Empirical study;Lightweight JavaScript engine;Software quality},


We explicitly avoid Typescript since additional tooling is needed to transpile Typescript to JavaScript


### SQLite as relational database


Library of congress recommended archival format  <https://www.loc.gov/preservation/resources/rfs/data.html>


Several implementations to read the byte format: rust Turso


Static map hosting:

<https://docs.protomaps.com/pmtiles/>


\

## HTTP range


### Mapping with pmfiles


DH project often have a mapping component. Similarly to the rest of Pihka mapping can be done without the need for external services or software running on a server. A hybrid approach is proposed: a locally hosted, detailed pmfile of the region of interest combined with an on-line third party service which serves the rest of the world in less detail. The rest of the world backup is a - by defenition - unreliable third party which will go offline. If the third party goes offline the main focus is still captured by the local pmfile.


### Custom UI views for specific research data goals


Think about 

* A view on text annotations 
* A custom map with origin and target of e.g. a letter
* A view on external IIIF material


Pihka should allow to register components to show detail views or list views for (filtered) data.


### Custom machine readable formats


Similar to views Pihka should allow to plug-in field related standard representations: xml formats, json formats, TEI documents, .. through the use of components which yield this info. 


### Bibliography 

*2018 Software sustainability: Research and practice from a software architecture viewpoint*

Colin C. Venters a, [Rafael Capilla b](https://www.sciencedirect.com/author/8931696900/rafael-capilla), Stefanie Betz c, [Birgit Penzenstadler d](https://www.sciencedirect.com/author/24765180000/birgit-penzenstadler), [Tom Crick e](https://www.sciencedirect.com/author/14032736300/tom-crick), Steve Crouch f, [Elisa Yumi Nakagawa g](https://www.sciencedirect.com/author/7007008701/elisa-yumi-nakagawa), Christoph Becker h, Carlos Carrillo i

Life and Death of DH Projects: A Preliminary Investigation of Their Lifecycles in Italy, Erica Andreose, Giorgia Crosilla, Remo Grillo , Gianmarco Spinaci

https://endings.uvic.ca/principles.html

https://dhq.digitalhumanities.org/vol/17/1/000669/000669.html

2023 Sustainable software engineering: Reflections on advances in research and practice \nColin C. Venters a b , Rafael Capilla c g , Elisa Yumi Nakagawa d g , Stefanie Betz e g , Birgit Penzenstadler f g , Tom Crick h , Ian Brooks i