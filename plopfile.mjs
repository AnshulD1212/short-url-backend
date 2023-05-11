/* eslint-disable semi */
export default function (plop) {
  plop.setGenerator('crud apis', {
    description: 'this is generator for creating crud APIs with test cases',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Please name your resource:'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/main/types/{{name}}.ts',
        templateFile: 'templates/types.hbs'
      },
      {
        type: 'add',
        path: 'src/main/{{name}}/services/{{name}}.service.ts',
        templateFile: 'templates/service.hbs'
      },
      {
        type: 'add',
        path: 'src/main/{{name}}/services/{{name}}.service.test.ts',
        templateFile: 'templates/serviceTest.hbs'
      },
      {
        type: 'add',
        path: 'src/main/{{name}}/controller/{{name}}.controller.ts',
        templateFile: 'templates/controller.hbs'
      },
      {
        type: 'add',
        path: 'src/main/{{name}}/controller/{{name}}.controller.test.ts',
        templateFile: 'templates/controllerTest.hbs'
      },
      {
        type: 'add',
        path: 'src/main/{{name}}/{{name}}.routes.ts',
        templateFile: 'templates/routes.hbs'
      }
    ]
  });

  plop.setHelper('titleCase', text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
}
