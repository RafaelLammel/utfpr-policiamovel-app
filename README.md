# Polícia Móvel (Frontend)

Este repositório contém a implementação do aplicativo android do sistema *Polícia Móvel*. Com o intuíto de ser um aplicativo de auxílio às forças policiais, nasceu como um TCC da Universidade Tecnológica Federal do Paraná e agora é um projeto público que pode ser expandido e adaptado por qualquer indivíduo.

## Funcionalidades

Atualmente, o projeto conta com as seguintes funcionalidades:

- Tela de autenicação de usuário;
- Tela home + serviço background que coleta a localização do usuário.

## Como Rodar

É necessário possuir o [Node](https://nodejs.org/en/) instalado e uma instância do [backend](https://github.com/RafaelLammel/utfpr-policiamovel-backend).

- No arquivo **src/api.ts**, preencha a URL correta da instância do backend;
- Execute o comando:

```bash
npm install
```

- Siga os tutoriais da [expo](https://docs.expo.dev/workflow/run-on-device/) para rodar o aplicativo em um dispositivo emulado ou físico.