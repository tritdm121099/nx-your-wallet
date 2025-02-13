export const translateTextKeys = {
  common: {
    signIn: 'common.signIn',
    signUp: 'common.signUp',
    logout: 'common.logout',
    homePage: 'common.homePage',
    languages: {
      en: 'common.languages.en',
      vi: 'common.languages.vi',
    },
    notImplemented: 'common.notImplemented',
    password: 'common.password',
    dashboard: 'common.dashboard',
  },
  pages: {
    signIn: {
      forgotPassword: 'pages.signIn.forgotPassword',
      notHaveAccount: 'pages.signIn.notHaveAccount',
      createOne: 'pages.signIn.createOne',
      loginWithSocialMedia: 'pages.signIn.loginWithSocialMedia',
      loginWith: 'pages.signIn.loginWith',
    },
    signUp: {
      createAccount: 'pages.signUp.createAccount',
      haveAccount: 'pages.signUp.haveAccount',
      forms: {
        confirmPassword: {
          label: 'pages.signUp.forms.confirmPassword.label',
          placeHolder: 'pages.signUp.forms.confirmPassword.placeHolder',
        },
        confirmPassNotMatch: 'pages.signUp.forms.confirmPassNotMatch',
        pleaseConfirmPass: 'pages.signUp.forms.pleaseConfirmPass',
        name: {
          label: 'pages.signUp.forms.name.label',
          placeHolder: 'pages.signUp.forms.name.placeHolder',
        },
        email: {
          errors: {
            haveRegistered: 'This email has been registered!',
          },
        },
      },
    },
  },
  forms: {
    errors: {
      minLength: 'forms.errors.minLength',
      required: 'forms.errors.required',
      validPlease: 'forms.errors.validPlease',
    },
  },
  http: {
    errors: {
      '401': 'http.errors.401',
      '403': 'http.errors.402',
      '404': 'http.errors.403',
      '500': {
        title: 'http.errors.500.title',
        message: 'http.errors.500.message',
      },
      networkConnection: {
        title: 'http.errors.networkConnection.title',
        message: 'http.errors.networkConnection.message',
      },
    },
  },
};
