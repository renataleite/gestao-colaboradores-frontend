# GestaoColaboradoresFrontend

Este é o projeto frontend desenvolvido em Angular para o sistema de gestão de colaboradores. O sistema permite gerenciar informações de colaboradores e registros de frequência, integrando-se com um backend ASP.NET Core para fornecer uma aplicação completa de gerenciamento.

## Arquitetura Utilizada

O projeto frontend utiliza uma **arquitetura baseada em componentes e serviços**, que é a abordagem recomendada para o desenvolvimento de aplicações Angular modernas.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **src/app/components**: Contém os componentes Angular que representam as diferentes partes da aplicação, como formulários de colaboradores, listas, e relatórios.
- **src/app/models**: Contém os modelos TypeScript que definem a estrutura dos dados usados na aplicação.
- **src/app/services**: Contém os serviços Angular que são responsáveis por interagir com o backend via HTTP e fornecer dados para os componentes.

## Funcionalidades

- **Gestão de Colaboradores**:
  - Listar todos os colaboradores.
  - Adicionar, editar e excluir colaboradores.
- **Gestão de Frequências**:
  - Listar registros de frequência.
  - Filtrar registros por mês e ano.
  - Exportar registros para Excel.
- **Navegação Intuitiva**:
  - Barra lateral para navegação fácil entre diferentes seções da aplicação.

## Tecnologias Utilizadas

- **Angular**: Framework principal para a construção do frontend.
- **RxJS**: Biblioteca para programação reativa.
- **TailwindCSS**: Framework CSS para estilização e design responsivo.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.

## Requisitos

- **Node.js** versão 14 ou superior
- **Angular CLI** versão 15.2.11 ou superior

## Como Executar o Projeto

1. **Clonar o Repositório:**

   ```bash
   git clone https://github.com/renataleite/gestao-colaboradores-frontend.git
   cd gestao-colaboradores-frontend
   ```

2. **Instalar Dependências:**

   Execute o comando abaixo para instalar todas as dependências necessárias:

   ```bash
   npm install
   ```

3. **Executar a Aplicação:**

   Execute o projeto utilizando o Angular CLI:

   ```bash
   ng serve
   ```

   A aplicação estará disponível em `http://localhost:4200`.

## Scripts Disponíveis

No arquivo `package.json`, você encontrará alguns scripts úteis para desenvolvimento:

- `start`: Inicia o servidor de desenvolvimento.
- `build`: Compila o projeto para produção na pasta `dist/`.
- `watch`: Recompila o projeto automaticamente em modo de desenvolvimento.
- `test`: Executa testes unitários usando o Karma.

## Estilo de Código

O projeto utiliza **TailwindCSS** para estilização. Certifique-se de revisar a documentação do TailwindCSS para entender as convenções e práticas recomendadas.

## Contribuição

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**. Todas as contribuições são bem-vindas!

