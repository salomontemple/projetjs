
  document.querySelector("#formulaire-calcul-salaire").addEventListener("submit", function (event) {
         event.preventDefault();
   
         var isValide=true;
         var prenom = document.querySelector("#prenom").value;
         var nom = document.querySelector("#nom").value;
         var sexe = document.querySelector("#sexe").value;
        
         var salaireBrute = parseInt(document.querySelector("#salaire-brute").value,10);
         var nombreEnfant = parseInt(document.querySelector("#nombre-personne-a-charge").value,10);

         var supplement = document.querySelector("#supplement").checked;
         var allocation = document.querySelector("#allocation").checked;

         if(prenom.length === 0) {
            document.querySelector("#error-prenom").style.display="block";
            isValide=false;
         }else {
            document.querySelector("#error-prenom").style.display="none";
         }

         if(nom.length===0) {
            document.querySelector("#error-nom").style.display="block";
            isValide=false;
         }else {
            document.querySelector("#error-nom").style.display="none";
         }

         if(isNaN(salaireBrute)) {
            document.querySelector("#error-salaire-brute").style.display="block";
            isValide=false;
         }else {
            document.querySelector("#error-salaire-brute").style.display="none";
         }
         if(isNaN(nombreEnfant)) {
            document.querySelector("#error-nombre-personne-a-charge").style.display="block";
            isValide=false;
         }else {
            document.querySelector("#error-nombre-personne-a-charge").style.display="none";
         }
         document.querySelector("#bulletin-employe").innerText=prenom+" "+nom;

        
         var montantSupplement= (supplement)?salaireBrute*0.2:0;
         var montantAllocation= (allocation)?salaireBrute*0.25:0;

         var salaireBruteTotal=salaireBrute+montantAllocation+montantSupplement;
         var assuranceEmploye = salaireBruteTotal * 0.07;
         var regimePension = salaireBruteTotal * 0.05;
         var imposSurLeRevenu= 0.18;
         var reductionImpos = function(){
           var reduction = imposSurLeRevenu;
           if(sexe === "femme"){
             reduction -= 0.02;
           }
           
           else{
             if(nombreEnfant === 3){
             reduction -= 0.01
              }
             else if(nombreEnfant > 3){
               reduction -= 0.02
              }
            }
           return salaireBruteTotal * reduction;
         }
           var salaireNet = salaireBruteTotal - assuranceEmploye - regimePension - reductionImpos();
        
         document.querySelector("#bulletin-allocation").innerText=montantAllocation.toLocaleString();
         document.querySelector("#bulletin-supplement").innerText=montantSupplement.toLocaleString();
         document.querySelector("#bulletin-salaire-brute").innerText=salaireBruteTotal.toLocaleString();
         document.querySelector("#assurance-employe").innerText=assuranceEmploye.toLocaleString();
         document.querySelector("#regime-pension").innerText=regimePension.toLocaleString();
         document.querySelector("#impos-sur-revenu").innerText=reductionImpos().toLocaleString();
         document.querySelector("#salaire-net").innerText=salaireNet.toLocaleString();

         
         if(!isValide) {
             return false;
         }
    //return false;

     });


     
document.querySelector("body").addEventListener("click", function (event) { 

  document.querySelector("#formulaire-calcul-salaire").style.display="block";
  document.querySelector("#partie-bulletin").classList.add("col-md-4");
  document.querySelector("#partie-bulletin").classList.remove("col-md-12");


});

document.querySelector("#imprimer").addEventListener("click", function (event) { 

  document.querySelector("#formulaire-calcul-salaire").style.display="none";
  document.querySelector("#partie-bulletin").classList.remove("col-md-4");
  document.querySelector("#partie-bulletin").classList.add("col-md-12");
  print();

});