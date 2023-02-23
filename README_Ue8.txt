Aufgabe 8
Erstellen Sie in einer express.js Anwendung ein Formular, das folgende Felder enthält (* bedeutet Pflichtfelder):

    Textfeld Name *
    Textarea Adresse
    Textfeld Telefonnummer
    Textfeld Email *
    Checkbox Newsletter-Anmeldung
    Submit-Button

Erstellen Sie dazu ein Mongoose-Schema, das die entsprechenden Werte abbildet und validieren Sie die Formularfelder serverseitig entsprechend.
Für die Validierung mit express-validator stehen Ihnen auch alle Methoden der validator.js-Bibliothek (zB.
    isEmail()) zur Verfügung.
BITTE BEACHTEN:Die mongodb/mogoose update Funktion in der Form wie wir sie aufrufenawait formModel.findOneAndUpdate(  { _id: req.params.id },
  req.body
);    ändert nur bestehende Felder in der DB, löscht aber keine. Steht nun etwa in der DB:
{...newsletter: "on"}und req.body enthält KEIN newsletter-Feld (da die checkbox abgewählt ist), bleibt der Wert in der DB unverändert.Eine
Lösung wäre, VOR der update Funktion, das Feld explizit auf null zu setzten, wenn es nicht vorhanden ist, etwa mit
if (!req.body.newsletter) req.body.newsletter = null;await formModel.findOneAndUpdate(...)