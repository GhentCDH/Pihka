e# Pihka - Sustainable data publication platform

## Abstract



## Introduction

The result of many digital humanities research projects are captured a research database or data set. Researchers can spend years to compile lists of annotations, historical social networks, meta-data on coin-finds, and so forth. The research data should far outlive research projects.

The data *afterlive* can take several forms. A static dump on a research data platforms which makes the data reusable is already a good practice. Unfortunately, static data dumps are not very attractive. Browsing, filtering or searching through a static data dump is not straightforward. Getting a feel for the data is difficult, even with meta-data documentation.

An alternative is to keep a software environment alive where data can be accessed, browsed and queried. The reality of hosting databases, back-ends, microservices, or other 'live' services, is that there are *costs associated with maintenance*: upkeep, security upgrades, monitoring,... Costs that should be avoided since the reality of project funding is that, once a project is completed, there is effectively no budget for maintenance. Infrastructure with real running costs while having no budget is not sustainable. Over time, the result is a graveyard of DH-projects and, even worse, inaccessible research data.

The reality of *zero maintenance budget* should be an integral part of *the design of sustainable data publication software*. There is a need for a platform which goes beyond a static data dump and presents data in an attractive way with functionality expected for a data publishing platform: faceted search, full text search, data exploration, extendable data visualisation while keeping maintenance costs virtually zero. This paper presents a set of software design choices for a sustainable data publication platform together with an open-source implementation in the form of the Pihka platform. 


## Requirements and sustainable software 


Some hallmarks of sustainable software systems in general 

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


### Extension: Mapping without external services


DH project often have a mapping component. Similarly to the rest of Pihka mapping can be done without the need for external services or software running on a server. A hybrid approach is proposed: a locally hosted, detailed pmfile of the region of interest combined with an on-line third party service which serves the rest of the world in less detail. The rest of the world backup is a - by defenition - unreliable third party which will go offline. If the third party goes offline the main focus is still captured by the local pmfile.

Protomaps https://protomaps.com/  and the associated PMTiles technology. 


### Extension: IIIF viewer

IIIF is a standard way to describe and use images and their meta-data on the web. With a rich eco-system of viewers, tooling, annotation platforms it has become the defacto standard to publish historic manuscripts and other scanned material.

A selling point of IIIF is that archives allow image infrastructure reuse and implicitly promise to keep IIIF endpoints running. The advantage is that heteregoeneous data sets can be combined in a single endpoint and that storing, hosting, infrastructure is resused. However, relying on external archival partners to host IIIF is, however, a concern and breaks the Pihka philosophy to keep everything local. There are solutions to keep manifests and IIIF tiles completely static and local. See the IIIF training material for such setup https://training.iiif.io/ 

Practically Pihka includes a lightweight IIIF-viewer TIFY. The extension does not rely on external code but keeps everything local

https://tify.rocks/?tify=%7B%22pages%22%3A%5B2%2C3%5D%7D 



### Extension: Text annotation

Next to maps and images, annotations on text are another common type of data which requires a bespoke visualisation. Lists of where person names, place names or other entities are present in a text quickly become unwieldly if no custom visualisation is used.

Practically https://www.npmjs.com/package/@ghentcdh/annotated-text


### Extendability



Pihka should allow to register components to show detail views or list views for (filtered) data.


### Custom machine readable formats


Similar to views Pihka should allow to plug-in field related standard representations: xml formats, json formats, TEI documents, .. through the use of components which yield this info. 


### Bibliography 

*2018 Software sustainability: Research and practice from a software architecture viewpoint*
Colin C. Venters a, [Rafael Capilla b](https://www.sciencedirect.com/author/8931696900/rafael-capilla), Stefanie Betz c, [Birgit Penzenstadler d](https://www.sciencedirect.com/author/24765180000/birgit-penzenstadler), [Tom Crick e](https://www.sciencedirect.com/author/14032736300/tom-crick), Steve Crouch f, [Elisa Yumi Nakagawa g](https://www.sciencedirect.com/author/7007008701/elisa-yumi-nakagawa), Christoph Becker h, Carlos Carrillo i
@article{venters2018software,
  title={Software sustainability: Research and practice from a software architecture viewpoint},
  author={Venters, Colin C and Capilla, Rafael and Betz, Stefanie and Penzenstadler, Birgit and Crick, Tom and Crouch, Steve and Nakagawa, Elisa Yumi and Becker, Christoph and Carrillo, Carlos},
  journal={Journal of Systems and Software},
  volume={138},
  pages={174--188},
  year={2018},
  publisher={Elsevier}
}


Life and Death of DH Projects: A Preliminary Investigation of Their Lifecycles in Italy, Erica Andreose, Giorgia Crosilla, Remo Grillo , Gianmarco Spinaci
@incollection{andreose2025life,
  title={Life and Death of DH Projects: A Preliminary Investigation of Their Lifecycles in Italy},
  author={Andreose, Erica and Crosilla, Giorgia and Grillo, Remo and Spinaci, Gianmarco and others},
  booktitle={Diversit{\`a}, Equit{\`a} e Inclusione: Sfide e Opportunit{\`a} per l’Informatica Umanistica nell’Era dell’Intelligenza Artificiale, Proceedings del XIV Convegno Annuale AIUCD2025},
  pages={575--580},
  year={2025}
}

Endings Project
https://endings.uvic.ca/principles.html



2023 Sustainable software engineering: Reflections on advances in research and practice \nColin C. Venters a b , Rafael Capilla c g , Elisa Yumi Nakagawa d g , Stefanie Betz e g , Birgit Penzenstadler f g , Tom Crick h , Ian Brooks i
@article{venters2023sustainable,
  title={Sustainable software engineering: Reflections on advances in research and practice},
  author={Venters, Colin C and Capilla, Rafael and Nakagawa, Elisa Yumi and Betz, Stefanie and Penzenstadler, Birgit and Crick, Tom and Brooks, Ian},
  journal={Information and Software Technology},
  volume={164},
  pages={107316},
  year={2023},
  publisher={Elsevier}
}


digital humanities quarterly special issue intro text
@article{holmes2023introduction,
  title={Introduction to Special Issue: Project Resiliency in the Digital Humanities.},
  author={Holmes, Martin and Jenstad, Janelle and Huculak, J Matthew},
  journal={DHQ: Digital Humanities Quarterly},
  volume={17},
  number={1},
  year={2023}
}

Academics Retire and Servers Die: Adventures in the Hosting and Storage of Digital Humanities Projects
https://dhq.digitalhumanities.org/vol/17/1/000669/000669.html
@article{cummings2023academics,
  title={Academics Retire and Servers Die: Adventures in the Hosting and Storage of Digital Humanities Projects.},
  author={Cummings, James},
  journal={DHQ: Digital Humanities Quarterly},
  volume={17},
  number={1},
  year={2023}
}