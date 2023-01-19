/* ---------- utilisation d'une bézier comme trajectoire
 la formule est à récupérer de la page précédente. 
 Elle est introduite dans le programme par la méthode definitTrajectoire
 Le mouvement est ensuite enclenché par l'appel à la méthode deplace
*/ 
 
function ajoute(){
 var xP0 =[163, 286, 585, 777]; // liste des x par défaut
 var yP0 =[402, 213, 213, 381]; // liste des y par défaut
 var xP = []; // liste des x de la trajectoire
 var yP = []; // liste des y de la trajectoire
 var timer;
 var Obj = {};
 
 Obj.positionne = positionne;
 Obj.deplace = deplace;
 Obj.deplaceTg = deplaceTg;
 Obj.deplaceNonTg = deplaceNonTg;
 Obj.deplaceTgPi = deplaceTgPi;
 Obj.definitTrajectoire = definirTrajectoire;
 Obj.editeTrajectoire = editerTrajectoire;
 
 return Obj;

 //---------------- fonctions publiques ------------------------------

 function positionne (num,t){// positionne l'objet obj sur la bézier à la date t
 // num (integer) : numéro de l'objet à déplacer (20 pour l'objet d'id "obj20")
 var elmt = selectionne(num);
 var XY = ptBezier(t);
 elmt.style.left=XY.x+"px";
 elmt.style.top=XY.y+"px"; 
 }

 function deplace (num, duree){
 // num (integer) : numéro de l'objet à déplacer (20 pour l'objet d'id "obj20")
 // duree (integer) : durée du déplacement en millisecondes
 var elmt = selectionne(num);
 var nb = duree/60.0; // nombre de pas du déplacement
 var pas = 1/nb;
 var t =0;
  timer = setInterval(function(){
 var XY = ptBezier(t);
 elmt.style.left=XY.x+"px";
 elmt.style.top=XY.y+"px"; 
 t+= pas;
 if (t >=1){
 clearInterval(timer);
 }
 },60); 
 }
 
 function deplaceTg (num,duree){// déplace sur une bézier et oriente un objet d'id donné
    // num (integer) : numéro de l'objet à déplacer (20 pour l'objet d'id "obj20")
    // duree (integer) : durée du déplacement en millisecondes
        var elmt = selectionne(num);
        var nb = duree/60.0; // nb de pas pour parcourir la bézier
        var pas = 1/nb;
        var t =0;
        timer = setInterval(function(){
          var XY =  ptBezier(t);
          var angle = orientationBezier(t);
          elmt.style.left=XY.x+"px";
          elmt.style.top=XY.y+"px"; 
          elmt.style.transform="rotate("+angle+"rad)";
          t+= pas;
          if (t >=1){
              clearInterval(timer);
          }
        },60);        
    }
    
 function deplaceTgPi (num,duree){// déplace sur une bézier et oriente un objet d'id donné
    // num (integer) : numéro de l'objet à déplacer (20 pour l'objet d'id "obj20")
    // duree (integer) : durée du déplacement en millisecondes
        var elmt = selectionne(num);
        var nb = duree/60.0; // nb de pas pour parcourir la bézier
        var pas = 1/nb;
        var t =0;
        timer = setInterval(function(){
          var XY =  ptBezier(t);
          var angle = orientationBezier(t)+Math.PI ;
          elmt.style.left=XY.x+"px";
          elmt.style.top=XY.y+"px"; 
          elmt.style.transform="rotate("+angle+"rad)";
          t+= pas;
          if (t >=1){
              clearInterval(timer);
          }
        },60);        
    }

function deplaceNonTg (num,duree){// déplace sur une bézier et oriente un objet d'id donné
    // num (integer) : numéro de l'objet à déplacer (20 pour l'objet d'id "obj20")
    // duree (integer) : durée du déplacement en millisecondes
        var elmt = selectionne(num);
        var nb = duree/60.0; // nb de pas pour parcourir la bézier
        var pas = 1/nb;
        var t =0;
        timer = setInterval(function(){
          var XY =  ptBezier(t);
          //var angle = orientationBezier(t)+Math.PI ;
          elmt.style.left=XY.x+"px";
          elmt.style.top=XY.y+"px"; 
          //elmt.style.transform="rotate("+angle+"rad)";
          t+= pas;
          if (t >=1){
              clearInterval(timer);
          }
        },60);        
    }

 function definirTrajectoire(xP1,yP1){// entre la formule de la trajectoire
 // xP (array) : liste des coordonnées x des points définissant la bézier
 // yP (array) : liste des coordonnées y des points définissant la bézier
 xP = xP1||xP0;
 yP = yP1||yP0;
 }

 function editerTrajectoire (){ // affiche la formule de la trajectoire
 var formule = [];
 formule.push(xP);
 formule.push(yP);
 var texte = "[["+xP+"],["+yP+"]";
 pubcoder.alert("formule de la bézier",texte); 
 }

 // ------------------ fonctions outils privées -------------------------------
 function ptBezier(t){ // valeur des coordonnées d'un poit d'une bézier
 //t est l'abcisse curviligne t est compris sur [0,1] ; 
 var x,y; 
 if (t <= 0){return {"x":xP[0],"y":yP[0]};}
 if (t >= 1){return {"x":xP[3],"y":yP[3]};}
 var d = 1-t;
 x= xP[0]*d*d*d + 3*xP[1]*d*d*t + 3*xP[2]*t*t*d + xP[3]*t*t*t;
 y= yP[0]*d*d*d + 3*yP[1]*d*d*t + 3*yP[2]*t*t*d + yP[3]*t*t*t;
 return {"x":x,"y":y};
 }
 
 function ptTangente(t){ // calcule un vecteur tangent en t à Bézier
        var x,y ;
        if (t <=0){
            x = 3*(xP[1]-xP[0]);
            y = 3*(yP[1]-yP[0]);
            return {"x":x,"y":y};
            }
        if (t >=1){
            x = 3*(xP[3]-xP[2]);
            y = 3*(yP[3]-yP[2]);
            return {"x":x,"y":y};
        }
        var d = 1-t;
        x = 3*(xP[1]-xP[0])*d*d + 6*(xP[2]-xP[1])*t*d + 3*(xP[3]-xP[2])*t*t;
        y = 3*(yP[1]-yP[0])*d*d + 6*(yP[2]-yP[1])*t*d + 3*(yP[3]-yP[2])*t*t;
        return {"x":x,"y":y};
    }
    
    function orientationBezier(t){
        var XY = ptTangente(t);
        var angle = Math.atan2(XY.y,XY.x) ; //angle en radians entre -PI et + PI
        //angle+=Math.PI;
        return angle;
    }

 function xy(pt){ //retourne les valeurs numériques des coordonnées d'un point
 // pt est l'identifiant d'un point
 var x = window.getComputedStyle(pt).left;
 x = x.substr(0,x.length-2);
 x = parseInt(x);
 var y = window.getComputedStyle(pt).top;
 y = y.substr(0,y.length-2);
 y =parseInt(y);
 return {"x":x,"y":y};
 }

 function selectionne (id){// sélectionne un objet par son numéro d'id
 var obj = "#obj"+id;
 var elmt = document.querySelector(obj);
 return elmt;
 }

}

document.perso = ajoute();