# PIL - Plataforma Integrada de Licitações

![PIL Logo](https://img.shields.io/badge/PIL-Plataforma%20Integrada%20de%20Licitações-blue)
![Lei 14.133/2021](https://img.shields.io/badge/Lei-14.133%2F2021-green)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-orange)

## 📋 Sobre o Projeto

A **PIL (Plataforma Integrada de Licitações)** é uma solução web moderna para geração automática de documentos de licitação em conformidade com a Lei nº 14.133/2021 (Nova Lei de Licitações). Utilizando inteligência artificial avançada (GPT-4), a plataforma gera documentos juridicamente sólidos e tecnicamente precisos.

### 🎯 Objetivo

Facilitar e agilizar o processo de criação de documentos licitatórios para profissionais de compliance e jurídicos, garantindo conformidade total com a legislação brasileira vigente.

## ✨ Funcionalidades

### 📄 Geração de Documentos
- **Editais de Licitação**: Completos e estruturados
- **Termos de Referência**: Detalhados e específicos
- **Minutas de Contrato**: Juridicamente robustas
- **Avisos de Licitação**: Formatados adequadamente

### ⚖️ Conformidade Legal
- Base na **Lei nº 14.133/2021**
- Instruções Normativas aplicáveis
- Decretos regulamentadores
- Jurisprudência dos Tribunais de Contas

### 🔧 Funcionalidades Técnicas
- Interface responsiva e moderna
- Histórico de documentos gerados
- Sistema de edição posterior
- Download em HTML formatado
- Logs de auditoria
- Validação de inputs

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 16.0.0 ou superior
- NPM ou Yarn
- Chave de API da OpenAI

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/pil-plataforma-licitacoes.git
cd pil-plataforma-licitacoes
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure a API da OpenAI
- Obtenha sua chave de API em [OpenAI Platform](https://platform.openai.com/)
- A configuração será solicitada na primeira execução da aplicação

### 4. Execute a Aplicação

#### Modo Desenvolvimento
```bash
npm run dev
```

#### Modo Produção
```bash
npm start
```

### 5. Acesse a Plataforma
Abra seu navegador em: `http://localhost:3000`

## 🎨 Interface e Uso

### 1. **Página Inicial**
- Apresentação da plataforma
- Estatísticas de uso
- Acesso rápido ao gerador

### 2. **Gerador de Documentos**
- Formulário intuitivo com campos:
  - Tipo de documento
  - Objeto da contratação
  - Modalidade de licitação
  - Tipo de licitação
  - Regime de execução
  - Critério de julgamento
  - Valor estimado
  - Prazo de execução
  - Local de execução
  - Observações adicionais

### 3. **Resultado**
- Documento gerado em tempo real
- Opções de edição
- Download em formato HTML
- Salvamento no histórico

### 4. **Histórico**
- Lista de documentos gerados
- Filtros por tipo e busca textual
- Visualização e reedição
- Controle de versões

## 📊 Arquitetura Técnica

### Frontend
- **HTML5**: Estrutura semântica moderna
- **CSS3**: Design responsivo com variáveis CSS
- **JavaScript ES6+**: Funcionalidades interativas
- **Fetch API**: Comunicação com backend e OpenAI

### Backend (Opcional)
- **Node.js**: Servidor Express
- **CORS**: Suporte a chamadas cross-origin
- **Logs de Auditoria**: Rastreamento de ações
- **Proxy OpenAI**: Alternativa para problemas de CORS

### Integração IA
- **OpenAI GPT-4**: Geração de conteúdo
- **Prompts Especializados**: Conhecimento em licitações
- **Validação**: Conformidade automática

## 🔒 Segurança

### Dados do Usuário
- Chaves de API armazenadas localmente
- Nenhum dado sensível enviado para servidores externos
- Histórico mantido no navegador do usuário

### Validação
- Sanitização de inputs
- Prevenção de injeções
- Validação de campos obrigatórios

### Auditoria
- Logs de geração de documentos
- Rastreamento de ações do usuário
- Controle de versões

## 📋 Estrutura de Arquivos

```
pil-plataforma-licitacoes/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos da aplicação
├── js/
│   └── app.js              # Lógica principal
├── server.js               # Servidor Node.js (opcional)
├── package.json            # Dependências do projeto
├── README.md               # Documentação
└── audit.log               # Logs de auditoria (gerado automaticamente)
```

## 🎯 Casos de Uso

### 1. **Órgãos Públicos**
- Secretarias municipais, estaduais e federais
- Autarquias e fundações públicas
- Empresas públicas

### 2. **Profissionais**
- Advogados especializados em direito administrativo
- Analistas de compliance
- Gestores públicos
- Consultores em licitações

### 3. **Empresas**
- Consultorias em gestão pública
- Escritórios de advocacia
- Empresas de auditoria

## 🛠️ Desenvolvimento

### Contribuindo
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Roadmap
- [ ] Integração com jsPDF para download real em PDF
- [ ] Sistema de templates personalizáveis
- [ ] Integração com bases de dados jurídicas
- [ ] API para integração com outros sistemas
- [ ] Dashboard administrativo
- [ ] Sistema de usuários e permissões

## 📚 Base Legal

### Legislação Principal
- **Lei nº 14.133/2021** - Nova Lei de Licitações e Contratos Administrativos
- **Lei nº 8.666/1993** - Lei de Licitações (revogada, mas referência histórica)
- **Decreto nº 10.024/2019** - Regulamenta licitação eletrônica

### Normas Complementares
- Instruções Normativas da Secretaria de Gestão
- Acórdãos do TCU relevantes
- Súmulas dos Tribunais de Contas

## ⚠️ Avisos Importantes

### Responsabilidade Legal
- Os documentos gerados são sugestões baseadas em IA
- **Sempre revise** o conteúdo antes do uso oficial
- Consulte assessoria jurídica quando necessário
- A responsabilidade final é do usuário

### Limitações
- Requer conexão com internet para geração
- Dependente da disponibilidade da API OpenAI
- Custos associados ao uso da API OpenAI

## 📞 Suporte

### Documentação
- [Lei nº 14.133/2021](http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/L14133.htm)
- [Portal de Compras Governamentais](https://www.gov.br/compras/pt-br)

### Contato
- **Email**: suporte@pil-licitacoes.com.br
- **Telefone**: (11) 9999-9999
- **Website**: https://pil-licitacoes.com.br

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🏆 Créditos

Desenvolvido com base na expertise em:
- **Direito Administrativo Brasileiro**
- **Lei de Licitações e Contratos**
- **Compliance Público**
- **Inteligência Artificial**

---

**© 2024 PIL - Plataforma Integrada de Licitações. Todos os direitos reservados.**

*Em conformidade com a Lei nº 14.133/2021 e demais normas aplicáveis.*