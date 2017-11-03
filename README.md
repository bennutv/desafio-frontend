# Desafio - Front-End Developer
Esse teste foi criado para avaliarmos seus conhecimentos gerais como desenvolvedor Front-end: HTML, CSS, Javascript, design responsivo e lógica. O desafio consiste em desenvolver a Home de um app fictício, seguindo o layout do psd disponibilizado, utilizando algumas funcionalidades e interações em Javascript.

## Instruções gerais para gerar um build dos arquivos:

```bash
$ npm install && bower install
```

### Obs antes de buildar:

1. Necessário ter a ruby gem do compass css
1. Os arquivos finais ficam no diretório /dist

### Para usar o web server
```bash
$ grunt build
```

### Para assistir com o web server
```bash
$ grunt serve
```

### Obs:

1. Foi necessário ajustar um erro no arquivo bennu.json (faltava fechar o array);
2. Infelizmente não houve tempo habil pra criar uma interação com o botão da Lupa, mas eu mostraria um campo de busca no header, e filtraria os artigos pelo texto.
3. Também não consegui testar em browse IE, não tenho pc windows por aqui :(
4. As imagens, embora eu tenha usado um minificador, continuam muito pesadas e comprometem drasticamente a performance. Uma dica é remover ela do nó do html a nivel de comparação.
