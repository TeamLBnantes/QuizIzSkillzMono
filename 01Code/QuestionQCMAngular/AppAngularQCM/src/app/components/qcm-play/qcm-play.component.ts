import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QcmServiceService } from 'src/app/service/qcm-service.service';
import { QcmPlayable } from 'src/app/classes/qcm-playable';
import { Qcm } from 'src/app/classes/qcm';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/classes/question';
import { Correction } from 'src/app/classes/correction';
import { AnswerCorrectionDto } from 'src/app/classes/answer-correction-dto';

// material
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { PopupmediaComponent } from '../popupmedia/popupmedia.component';

//icones FontAwsome
import { faPlayCircle, faVolumeUp, faExpand, faExclamationCircle, faReply} from '@fortawesome/free-solid-svg-icons';
import { SignalerService } from 'src/app/service/signaler.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-qcm-play',
  templateUrl: './qcm-play.component.html',
  styleUrls: ['./qcm-play.component.css']
})
export class QcmPlayComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private qcmService: QcmServiceService,
    private signalerService: SignalerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  private subscription: Subscription;
  private subscription2: Subscription;
  qcm: QcmPlayable;
  idqcm: string;
  lancer = false;
  corriger = false;
  thisIsTheEnd = false;
  bilan = false;
  qIndex = 0;
  idQuestion: number;
  question: Question;          // dans la question, les rep sont dans anwerPlayableDTO. ordre aléatoire
  reponsesAttendus: Correction;   // il faudra les mettre dans le même ordre que presentée dans la qiestion
  mapRep: Map<number, AnswerCorrectionDto>;   // map entre l'id d'une réponse et son contenu
  varAnswersCorrection: AnswerCorrectionDto[];  // tab des réponses attendu dans même ordre que reponses proposées
  // reponsesQuestionUser: Correction;    //servira à stoker les réponses de l'utilisateur à cette question
  reponsesQCMUser: boolean[]; // stockage de l'ensembles des réponses de l'utilisateur sur le qcm
  // qui poura etre retourné à QuizIzSkillz (l'id de ces rep sera recup dans l'objet qcm)
  reponsesAnswersUser: boolean[]; // reponse de l'utilisateur à Une question (donc à la liste des reponses)
  trueReponseAnswerUser: boolean[];  // tableau correction des reponses de l'utilisateur pour la question courante
  questionnumber: number;
  totalquestion: number;
  progress: string = '0%';
  //media
  adressTemp: string;
  mediaTypeDisplay: string;
  icone: any;
  vignette: string;
  vignetteDefault = '../../../assets/img/Qquestionmark.png';
  rejouerIcone = faReply;
  // Bilan
  correctAnswer: number;
  begining: any;
  time: any;
  timeMin: number;
  pourcentReussite: number;
  // Signalement
  signalerIcone = faExclamationCircle;
  causeSignal: string;
  signalInProgress = false;
  causesSignal = ['Contenu inapproprié', 'Contenu erroné', 'Contenu incompréhensible'];
  chargementOK = false;



  ngOnInit(): void {
    this.idqcm = this.route.snapshot.paramMap.get('id');
    console.log(this.idqcm);
    this.getQcm();
    this.reponsesQCMUser = []; // init le tableau des resultat de l'utilisateur sur ce qcm. Eval des question dans l'ordre
  }
  getQcm() {
    this.vignette = this.vignetteDefault;
    this.subscription = this.qcmService.getQcmPlayable(parseInt(this.idqcm)).subscribe(
      (data: QcmPlayable) => {
        this.qcm = data;
        if (this.qcm.multimedia != null) {
        if (this.qcm.multimedia.typeMultimedia == "video") {
          this.icone = faPlayCircle;
          this.mediaTypeDisplay = 'Rejouer la vidéo';
        } else if (this.qcm.multimedia.typeMultimedia == "image") {
          this.vignette = this.qcm.multimedia.adresseCible;
          //this.qcm.multimedia.adresseVignette=this.qcm.multimedia.adresseCible;
          this.icone = faExpand;
          this.mediaTypeDisplay = `Revoir l'image`;
        } else if (this.qcm.multimedia.typeMultimedia == "audio") {
          this.icone = faVolumeUp;
          this.mediaTypeDisplay = `Rejouer le son`;
        }
      
      }
        // if (this.qcm.multimedia != null || this.qcm.multimedia.adresseVignette != null || this.qcm.multimedia.typeMultimedia != "image") {
          if ( this.qcm.multimedia.adresseVignette != null && this.qcm.multimedia.typeMultimedia != "image" && this.qcm.multimedia.typeMultimedia != "aucun") {
          this.vignette = this.qcm.multimedia.adresseVignette;
        }

        if (this.qcm.topic == (null || '')) {
          this.qcm.topic = 'inconnu';
        }
        this.totalquestion = this.qcm.questionsId.length;
        this.chargementOK = true;
      }
    );
  }
  lancerQcm() {
    this.begining = Date.now();
    this.vignette = this.vignetteDefault;
    this.icone = null;
    this.lancer = true;
    this.questionnumber = 1;
    this.totalquestion = this.qcm.questionsId.length;
    this.idQuestion = this.qcm.questionsId[this.qIndex];
    this.reponsesAnswersUser = [];
    this.chargementOK = false;

    this.subscription = this.qcmService.getQuestion(this.idQuestion).subscribe(
      (data: Question) => {
        this.question = data;
        // if (this.question.multimedia != null && this.question.multimedia.adresseVignette != null || this.question.multimedia.typeMultimedia != "image") {
          if (this.question.multimedia.adresseVignette != null ) {  
          this.vignette = this.question.multimedia.adresseVignette;
        }
        if (this.question.multimedia != null){
        if (this.question.multimedia.typeMultimedia == "video") {
          this.icone = faPlayCircle;
        } else if (this.question.multimedia.typeMultimedia == "image") {
          this.icone = faExpand;
          this.vignette = this.question.multimedia.adresseCible;

        } else if (this.question.multimedia.typeMultimedia == "audio") {
          this.icone = faVolumeUp;
        }
        this.chargementOK = true;
      }
      }
    );
  }


  lancerQuestionCorriger() {
    this.chargementOK = false;
    this.trueReponseAnswerUser = [];
    this.corriger = true;    // pour afficher les reponses
    this.mapRep = new Map<number, AnswerCorrectionDto>();
    this.subscription2 = this.qcmService.getCorrection(this.idQuestion).subscribe(
      (data: Correction) => {
        this.reponsesAttendus = data;

        for (const rep of this.reponsesAttendus.answersCorrectionDto) {
          this.mapRep.set(rep.id, rep);
        }
        this.varAnswersCorrection = [];     // tableau des réponses attendus
        for (const rep of this.question.answersPlayableDto) {
          this.varAnswersCorrection.push(this.mapRep.get(rep.id));
        }
        // le tableau des reponse de l'utilisateur est initié et maj dans la page html
        this.trueReponseAnswerUser = [];    // tableau comparatif et donc de ercensement des bonnes reponses, init à vide

        let i = 0;
        this.reponsesQCMUser.push(true);
        for (const rep of this.varAnswersCorrection) {
          if (this.reponsesAnswersUser[i]) {
          } else { this.reponsesAnswersUser[i] = false; }
          this.trueReponseAnswerUser.push(rep.expectedAnswer == this.reponsesAnswersUser[i]);
          this.reponsesQCMUser[this.qIndex] = (this.trueReponseAnswerUser[i] && this.reponsesQCMUser[this.qIndex]);
          i++;
        }
        this.chargementOK = true;
      }
    );
    if (this.qIndex == this.qcm.questionsId.length - 1) {
      this.thisIsTheEnd = true;
    }


  }
  nextQuestion() {
    this.chargementOK = false;
    this.vignette = this.vignetteDefault;
    this.question = null;
    this.icone = null;
    this.corriger = false;
    this.reponsesAnswersUser = [];
    this.qIndex++;
    this.questionnumber++;
    //this.progress = (this.questionnumber/this.totalquestion)*100 + "%" ;
    this.idQuestion = this.qcm.questionsId[this.qIndex];
    this.subscription = this.qcmService.getQuestion(this.idQuestion).subscribe(
      (data: Question) => {
        this.question = data;
        // if (this.question.multimedia != null && this.question.multimedia.adresseVignette != null || this.question.multimedia.typeMultimedia != "image") {
        if (this.question.multimedia.adresseVignette != null) {
          this.vignette = this.question.multimedia.adresseVignette;
        }
        if (this.question.multimedia != null){
        if (this.question.multimedia.typeMultimedia == "video") {
          this.icone = faPlayCircle;
        } else if (this.question.multimedia.typeMultimedia == "image") {
          this.icone = faExpand;
          this.vignette = this.question.multimedia.adresseCible;

        } else if (this.question.multimedia.typeMultimedia == "audio") {
          this.icone = faVolumeUp;
        }
      }
      this.chargementOK = true;
      }
    );
  }

  bilanQCM() {
    this.bilan = true;
    this.correctAnswer=0;
    this.reponsesQCMUser.forEach(element => {
      if (element == true){
        this.correctAnswer++;
      };
      this.pourcentReussite = Math.round(this.correctAnswer / this.totalquestion * 100);
      this.time = Math.round((Date.now() - this.begining) / 1000);
      if (this.time >= 60){
        this.timeMin = Math.floor(this.time / 60);
        this.time = this.time % 60;
      }


    });
  }
  openMedia() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.adressTemp = this.question.multimedia.adresseCible;
    dialogConfig.data = {
      addresseMedia: this.question.multimedia.adresseCible,
      typeMedia: this.question.multimedia.typeMultimedia,
      legende: this.question.multimedia.legende
    };
    dialogConfig.height = '90%';
    dialogConfig.width = '90%';

    this.dialog.open(PopupmediaComponent, dialogConfig);
  }
  openQcmMedia() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.adressTemp = this.qcm.multimedia.adresseCible;
    dialogConfig.data = {
      addresseMedia: this.qcm.multimedia.adresseCible,
      typeMedia: this.qcm.multimedia.typeMultimedia,
      legende: this.qcm.multimedia.legende
    };
    dialogConfig.height = '90%';
    dialogConfig.width = '90%';

    this.dialog.open(PopupmediaComponent, dialogConfig);
  }

  signaler(){
    this.subscription = this.signalerService.postSignal(this.idQuestion, parseInt(this.idqcm), this.causeSignal).subscribe(
      );
    this.signalInProgress = false;
    console.log('qcm: '+ this.idqcm + '; question ' + this.idQuestion + '; message: ' + this.causeSignal)
    this.snackBar.open('Message envoyé', 'OK' ,{
      duration: 5000,
    });
  }

  initSignaler(){
    this.signalInProgress = true;
  }

  ngOnDestroy(): void {
    // eviter les fuites de memoires
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
