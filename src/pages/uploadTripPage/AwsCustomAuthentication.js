import React from "react";
import Amplify from 'aws-amplify';
import {AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";
import awsconfig from "../../aws-exports";
import { I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";

Amplify.configure(awsconfig);

I18n.putVocabulariesForLanguage("no", {
    [Translations.BACK_TO_SIGN_IN]: 'Tilbake til innlogging',
    [Translations.CHANGE_PASSWORD_ACTION]: 'Endre',
    [Translations.CHANGE_PASSWORD]: 'Endre passord',
    [Translations.CODE_LABEL]: 'Verifikasjons-kode',
    [Translations.CODE_PLACEHOLDER]: 'Skriv inn kode',
    [Translations.CONFIRM_SIGN_UP_CODE_LABEL]: 'Bekreftelses-kode',
    [Translations.CONFIRM_SIGN_UP_CODE_PLACEHOLDER]: 'Skriv inn kode',
    [Translations.CONFIRM_SIGN_UP_HEADER_TEXT]: 'Bekreft innmeldelse',
    [Translations.CONFIRM_SIGN_UP_LOST_CODE]: 'Mistet koden din?',
    [Translations.CONFIRM_SIGN_UP_RESEND_CODE]: 'Send kode på nytt',
    [Translations.CONFIRM_SIGN_UP_SUBMIT_BUTTON_TEXT]: 'Bekreft',
    [Translations.CONFIRM_SMS_CODE]: 'Bekreft SMS-kode',
    [Translations.CONFIRM_TOTP_CODE]: 'Bekreft TOTP-kode',
    [Translations.CONFIRM]: 'Bekreft',
    [Translations.CREATE_ACCOUNT_TEXT]: 'Lag bruker',
    [Translations.EMAIL_LABEL]: 'Epost-adresse *',
    [Translations.EMAIL_PLACEHOLDER]: 'Skriv inn epost',
    [Translations.FORGOT_PASSWORD_TEXT]: 'Glemt passordet?',
    [Translations.LESS_THAN_TWO_MFA_VALUES_MESSAGE]: 'Mindre enn to MFA-typer tilgjengelig',
    [Translations.NEW_PASSWORD_LABEL]: 'Nytt passord',
    [Translations.NEW_PASSWORD_PLACEHOLDER]: 'Minst 8 karakterer, 1 tall, 1 stor og 1 liten bokstav',
    [Translations.NO_ACCOUNT_TEXT]: 'Ingen bruker?',
    [Translations.USERNAME_REMOVE_WHITESPACE]: 'Brukernavn kan ikke inneholde mellomrom',
    [Translations.PASSWORD_REMOVE_WHITESPACE]: 'Passord kan ikke starte eller slutte med mellomrom',
    [Translations.PASSWORD_LABEL]: 'Passord *',
    [Translations.PASSWORD_PLACEHOLDER]: 'Skriv inn passord',
    [Translations.PHONE_LABEL]: 'Telefon-nummer *',
    [Translations.PHONE_PLACEHOLDER]: '12345678',
    [Translations.QR_CODE_ALT]: 'qr-kode',
    [Translations.RESET_PASSWORD_TEXT]: 'Tilbakestill passord',
    [Translations.RESET_YOUR_PASSWORD]: 'Tilbakestill passordet',
    [Translations.SELECT_MFA_TYPE_HEADER_TEXT]: 'Velg MFA-type',
    [Translations.SELECT_MFA_TYPE_SUBMIT_BUTTON_TEXT]: 'Verifiser',
    [Translations.SEND_CODE]: 'Send Kode',
    [Translations.SUBMIT]: 'Send',
    [Translations.SETUP_TOTP_REQUIRED]: 'TOTP må konfigurerres',
    [Translations.SIGN_IN_ACTION]: 'Logg Inn',
    [Translations.SIGN_IN_HEADER_TEXT]: 'Logg Inn i MasterSau Webportal',
    [Translations.SIGN_IN_TEXT]: 'Logg inn',
    [Translations.SIGN_IN_WITH_AMAZON]: 'Logg inn med Amazon',
    [Translations.SIGN_IN_WITH_AUTH0]: 'Logg inn med Auth0',
    [Translations.SIGN_IN_WITH_AWS]: 'Logg inn med AWS',
    [Translations.SIGN_IN_WITH_FACEBOOK]: 'Logg inn med Facebook',
    [Translations.SIGN_IN_WITH_GOOGLE]: 'Logg inn med Google',
    [Translations.SIGN_OUT]: 'Logg ut',
    [Translations.SIGN_UP_EMAIL_PLACEHOLDER]: 'Epost',
    [Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: 'Eksisterende bruker?',
    [Translations.SIGN_UP_HEADER_TEXT]: 'Lag bruker',
    [Translations.SIGN_UP_PASSWORD_PLACEHOLDER]: 'Minst ett tall, én stor og én liten bokstav',
    [Translations.SIGN_UP_SUBMIT_BUTTON_TEXT]: 'Opprett bruker',
    [Translations.SIGN_UP_USERNAME_PLACEHOLDER]: 'Brukernavnt',
    [Translations.SUCCESS_MFA_TYPE]: 'Suksess! Din MFA-type er nå:',
    [Translations.TOTP_HEADER_TEXT]: 'Scan, deretter skriv inn verifikasjons-kode',
    [Translations.TOTP_LABEL]: 'Skriv inn sikkerhets-kode:',
    [Translations.TOTP_ISSUER]: 'AWSCognito',
    [Translations.TOTP_SETUP_FAILURE]: 'TOTP-setup mislykkes',
    [Translations.TOTP_SUBMIT_BUTTON_TEXT]: 'Verifiser sikkerhets-token',
    [Translations.TOTP_SUCCESS_MESSAGE]: 'TOTP-setup vellykket',
    [Translations.UNABLE_TO_SETUP_MFA_AT_THIS_TIME]: 'Feil! Kunne ikke konfigerere MFA nå',
    [Translations.USERNAME_LABEL]: 'Brukernavn *',
    [Translations.USERNAME_PLACEHOLDER]: 'Skriv inn ditt brukernavn',
    [Translations.VERIFY_CONTACT_EMAIL_LABEL]: 'Epost',
    [Translations.VERIFY_CONTACT_HEADER_TEXT]: 'Bruker-gjenoppretting krever verifisering av kontaktinfo',
    [Translations.VERIFY_CONTACT_PHONE_LABEL]: 'Telefon-nummer',
    [Translations.VERIFY_CONTACT_SUBMIT_LABEL]: 'Send',
    [Translations.VERIFY_CONTACT_VERIFY_LABEL]: 'Verifiser',
    [Translations.ADDRESS_LABEL]: 'Adresse',
    [Translations.ADDRESS_PLACEHOLDER]: 'Skriv inn din adresse',
    [Translations.NICKNAME_LABEL]: 'Kallenavn',
    [Translations.NICKNAME_PLACEHOLDER]: 'Skriv inn ditt kallenavn',
    [Translations.BIRTHDATE_LABEL]: 'Bursdag',
    [Translations.BIRTHDATE_PLACEHOLDER]: 'Skriv inn din bursdag',
    [Translations.PICTURE_LABEL]: 'Bilde-URL',
    [Translations.PICTURE_PLACEHOLDER]: 'Skriv inn din bilde-URL',
    [Translations.FAMILY_NAME_LABEL]: 'Etternavn',
    [Translations.FAMILY_NAME_PLACEHOLDER]: 'Skriv inn ditt etternavn',
    [Translations.PREFERRED_USERNAME_LABEL]: 'Foretrukket brukernavn',
    [Translations.PREFERRED_USERNAME_PLACEHOLDER]: 'Skriv inn ditt foretrukne brukernavn',
    [Translations.GENDER_LABEL]: 'Kjønn',
    [Translations.GENDER_PLACEHOLDER]: 'Skriv inn ditt kjønn',
    [Translations.PROFILE_LABEL]: 'Profil-URL',
    [Translations.PROFILE_PLACEHOLDER]: 'Skriv inn din profil-URL',
    [Translations.GIVEN_NAME_LABEL]: 'Fornavn',
    [Translations.GIVEN_NAME_PLACEHOLDER]: 'Skriv inn ditt fornavn',
    [Translations.ZONEINFO_LABEL]: 'Tidssone',
    [Translations.ZONEINFO_PLACEHOLDER]: 'Skriv inn din tidssone',
    [Translations.LOCALE_LABEL]: 'Preferanser', //Locale...?
    [Translations.LOCALE_PLACEHOLDER]: 'Skriv inn dine preferanser', //Locale...?
    [Translations.UPDATED_AT_LABEL]: 'Oppdatert',
    [Translations.UPDATED_AT_PLACEHOLDER]: 'Skriv inn når informasjonen sist ble oppdatert',
    [Translations.MIDDLE_NAME_LABEL]: 'Mellomnavn',
    [Translations.MIDDLE_NAME_PLACEHOLDER]: 'Skriv inn ditt mellomnavn',
    [Translations.WEBSITE_LABEL]: 'Nettside',
    [Translations.WEBSITE_PLACEHOLDER]: 'Skriv inn din nettside',
    [Translations.NAME_LABEL]: 'Fullt navn',
    [Translations.NAME_PLACEHOLDER]: 'Skriv inn fullt navn',
    [Translations.PHOTO_PICKER_TITLE]: 'Tittel-velger',
    [Translations.PHOTO_PICKER_HINT]: 'Ancillary text or content may occupy this space here',
    [Translations.PHOTO_PICKER_PLACEHOLDER_HINT]: 'Placeholder hint',
    [Translations.PHOTO_PICKER_BUTTON_TEXT]: 'Button',
    [Translations.IMAGE_PICKER_TITLE]: 'Legg til profilbilde',
    [Translations.IMAGE_PICKER_HINT]: 'Foråndsvis bilde før opplasting',
    [Translations.IMAGE_PICKER_PLACEHOLDER_HINT]: 'Klikk på bilde for å velge',
    [Translations.IMAGE_PICKER_BUTTON_TEXT]: 'Last opp',
    [Translations.PICKER_TEXT]: 'Velg en fil',
    [Translations.TEXT_FALLBACK_CONTENT]: 'Fallback Content',
    [Translations.CONFIRM_SIGN_UP_FAILED]: 'Bekreftelse av innmeldelse misykket',
    [Translations.SIGN_UP_FAILED]: 'Innmeldelse Misslykket',

    [Translations.DEFAULT_MSG]: 'Autentifiserings-feil',
    [Translations.EMPTY_USERNAME]: 'Manglende brukernavn',
    [Translations.INVALID_USERNAME]: 'Brukernavnet burde enten være en string eller en av autentiseringstypene',
    [Translations.EMPTY_PASSWORD]: 'Passord kan ikke være tomt',
    [Translations.EMPTY_CODE]: 'Koden kan ikke være tom',
    [Translations.SIGN_UP_ERROR]: 'Feil under konto-laging',
    [Translations.NO_MFA]: 'Ingen godkjent MFA-metode oppgitt',
    [Translations.INVALID_MFA]: 'MFA-type ikke godkjent',
    [Translations.EMPTY_CHALLENGE]: 'Responsen kan ikke være tom',
    [Translations.NO_USER_SESSION]: 'Session error - ingen bruker',
});

const missingPhrases = {
    'no': {
        "User does not exist." : "Brukeren eksisterer ikke",
        "Username/client id combination not found." : "Kombinasjon av brukernavn/klient-id finnes ikke.",
        "An account with the given email already exists." : "En bruker med den eposten eksisterer allerede.",
        "Password did not conform with policy: Password not long enough": "Passordet må være minst 8 karakterer langt",
        "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
            "Passordet må være minst 8 karakterer langt",
    }
};

I18n.putVocabularies(missingPhrases);

I18n.setLanguage("no");

const AwsCustomAuthentication = () => {
    return (
        <AmplifyAuthenticator
            usernameAlias="email"
        >
            <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                    {
                        type: 'email',
                        placeholder: I18n.get(Translations.SIGN_UP_EMAIL_PLACEHOLDER),
                        required: true,
                    },
                    {
                        type: 'password',
                        placeholder: I18n.get(Translations.SIGN_UP_PASSWORD_PLACEHOLDER),
                        required: true,
                    },
                    {
                        type: 'phone_number',
                        required: true,
                        dialCode: '+47',
                    },
                ]}
            />
        </AmplifyAuthenticator>
    );
}

export default AwsCustomAuthentication;
