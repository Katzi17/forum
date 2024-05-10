import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-szte',
  templateUrl: './about-szte.component.html',
  styleUrls: ['./about-szte.component.scss'],
})
export class AboutSzteComponent implements OnInit {
  showMore = false;
  greenSZTE = `Ha átgondoljuk, hogy mi az, amit egy egyetem adhat hallgatóinak, az egyik dolog kétségtelenül a tudás, a szakma szeretete, a másik pedig az életszemlélet. Egyetemünk rendkívül fontos feladatának tekinti, hogy formálja a hallgatók gondolkodását, életszemléletét. Éppen ezért indítottuk el néhány évvel ezelőtt egyre több területre kiterjedő „zöldítő” programunkat, amelyben élen jár a 2020-ban tizenhat éves fennállását ünneplő SZTE József Attila Tanulmányi és Információs Központ.
  A zöldben gondolkodás jelentősen hozzájárult ahhoz, hogy a Szegedi Tudományegyetem 2010 óta folyamatosan javítja előkelő helyezését az indonéz „UI GreenMetricRanking of World Universities” felmérésben. 2019-ben a legjobbak közé került Egyetemünk: 780 felsőoktatási intézmény közül a 74., az európai egyetemek közül a 33., a hazai egyetemek közül pedig az 1. helyezést értük el.
  2019-ben ezzl az SZTE elnyerte a Legzöldebb Egyetem címet.Szerencsések vagyunk, hiszen a tudatos, környezetszerető és környezetet óvó gondolkodásban egy olyan generációval kell együttműködnünk, akiknek tagjai minden korábbi nemzedék hozzáállásával összehasonlítva igen komolyan gondolják, hogy a Földet nem apáinktól örököltük, hanem az unokáinktól kaptuk kölcsön.A Szegedi Tudományegyetem vezetése az elmúlt években-évtizedekben kiemelt figyelmet fordított és fordít az energiahatékonyság, környezettudatosság szempontjait szem előtt tartó nagyberuházásokra, az energiatakarékos és környezetbarát technológiákra.
  A napelemes energiatermelés ma már az egész egyetemi infrastruktúrát érinti, és több tízmillió forintos megtakarítást is eredményez amellett, hogy csökkenti ökolábnyomunkat. Az SZTE József Attila Tanulmányi és Információs Központ zöld fejlesztései, a környezetbarát szemlélet alapján működő egyetemi épületek, a geotermikus energia és az energiatakarékosságra ösztönző egyetemi kampányok kiemelkedő sikere azt bizonyítja, hogy az egyetemi polgárok fontosnak tartják a zöld egyetem programot.
  A környezettudatosságnak nem csupán az egyetemi épületekben megvalósuló szelektív hulladékgyűjtés, a szolármezők, hőkutak, hőszivattyúk, a szürkevizet hasznosító rendszer, a PlanibelTri üvegtechnológia, a mini szolárrendszer és a geotermikus fűtésrendszer a része, hanem a kerékpáros közlekedés ösztönzése, támogatása is.
  Az egyetem „zöld szigetén” az újszegedi Füvészkertben 2010-ben újjáépítették az üvegházat, megvalósult a fitotron rekonstrukció, és rehabilitálták a vizes élőhelyeket.`;

  constructor() {}

  ngOnInit() {}
}
