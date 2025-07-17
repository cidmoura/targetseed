/**
 * PIL - Plataforma Integrada de Licitações
 * Sistema de geração automática de documentos de licitação
 * Baseado na Lei nº 14.133/2021
 */

class PILApp {
    constructor() {
        this.currentDocument = null;
        this.documentHistory = JSON.parse(localStorage.getItem('pil_history')) || [];
        this.openaiApiKey = localStorage.getItem('openai_api_key') || '';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.loadHistory();
        this.checkApiKey();
    }

    checkApiKey() {
        if (!this.openaiApiKey) {
            this.showApiKeyModal();
        }
    }

    showApiKeyModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Configurar API Key</h3>
                </div>
                <div class="modal-body">
                    <p>Para utilizar a plataforma, você precisa configurar sua chave de API da OpenAI:</p>
                    <div class="form-group">
                        <label class="form-label" for="apiKeyInput">Chave da API OpenAI:</label>
                        <input type="password" class="form-input" id="apiKeyInput" placeholder="sk-...">
                    </div>
                    <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 1rem;">
                        Sua chave será armazenada localmente e usada apenas para gerar documentos.
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" id="saveApiKey">Salvar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('saveApiKey').addEventListener('click', () => {
            const apiKey = document.getElementById('apiKeyInput').value.trim();
            if (apiKey) {
                this.openaiApiKey = apiKey;
                localStorage.setItem('openai_api_key', apiKey);
                document.body.removeChild(modal);
            } else {
                alert('Por favor, insira uma chave válida.');
            }
        });
    }

    setupEventListeners() {
        // Formulário principal
        const form = document.getElementById('documentForm');
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Botões de ação
        document.getElementById('limparForm').addEventListener('click', () => this.clearForm());
        document.getElementById('editarDocumento').addEventListener('click', () => this.editDocument());
        document.getElementById('downloadPDF').addEventListener('click', () => this.downloadPDF());
        document.getElementById('salvarHistorico').addEventListener('click', () => this.saveToHistory());

        // Modal de edição
        document.getElementById('closeEditModal').addEventListener('click', () => this.closeEditModal());
        document.getElementById('cancelEdit').addEventListener('click', () => this.closeEditModal());
        document.getElementById('saveEdit').addEventListener('click', () => this.saveEditedDocument());

        // Filtros do histórico
        document.getElementById('searchHistorico').addEventListener('input', (e) => this.filterHistory(e.target.value));
        document.getElementById('filterTipo').addEventListener('change', (e) => this.filterHistoryByType(e.target.value));

        // Formatação de valor monetário
        document.getElementById('valorEstimado').addEventListener('input', (e) => this.formatCurrency(e));
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.navigateToSection(target);
                
                // Atualizar classes ativas
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    navigateToSection(sectionId) {
        // Ocultar todas as seções
        const sections = ['home', 'documentos', 'historico'];
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                section.style.display = id === sectionId ? 'block' : 'none';
            }
        });

        // Seção documentos sempre visível na home
        if (sectionId === 'home') {
            document.getElementById('documentos').style.display = 'block';
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.openaiApiKey) {
            this.showApiKeyModal();
            return;
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Validar campos obrigatórios
        const requiredFields = ['tipoDocumento', 'objeto', 'modalidade', 'tipoLicitacao', 'regimeExecucao', 'criterioJulgamento'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            this.showError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        await this.generateDocument(data);
    }

    async generateDocument(data) {
        const submitBtn = document.getElementById('gerarDocumento');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Estado de carregamento
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';

        try {
            const prompt = this.buildPrompt(data);
            const response = await this.callOpenAI(prompt);
            
            this.currentDocument = {
                id: Date.now(),
                tipo: data.tipoDocumento,
                objeto: data.objeto,
                content: response,
                data: new Date().toISOString(),
                parametros: data
            };

            this.displayResult(response);
            
        } catch (error) {
            console.error('Erro ao gerar documento:', error);
            this.showError('Erro ao gerar documento. Verifique sua conexão e tente novamente.');
        } finally {
            // Restaurar estado do botão
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    buildPrompt(data) {
        const tipoDocumento = this.getTipoDocumentoName(data.tipoDocumento);
        
        return `Você é um especialista em licitações públicas brasileiras com conhecimento profundo da Lei nº 14.133/2021 (Nova Lei de Licitações), instruções normativas, decretos regulamentadores e jurisprudência dos tribunais de contas.

Gere um ${tipoDocumento} completo e profissional com base nos seguintes parâmetros:

**DADOS DA LICITAÇÃO:**
- Tipo de Documento: ${tipoDocumento}
- Objeto: ${data.objeto}
- Modalidade: ${data.modalidade}
- Tipo de Licitação: ${data.tipoLicitacao}
- Regime de Execução: ${data.regimeExecucao}
- Critério de Julgamento: ${data.criterioJulgamento}
${data.valorEstimado ? `- Valor Estimado: R$ ${data.valorEstimado}` : ''}
${data.prazoExecucao ? `- Prazo de Execução: ${data.prazoExecucao}` : ''}
${data.localExecucao ? `- Local de Execução: ${data.localExecucao}` : ''}
${data.observacoes ? `- Observações: ${data.observacoes}` : ''}

**REQUISITOS OBRIGATÓRIOS:**
1. Conformidade total com a Lei nº 14.133/2021
2. Estrutura formal e hierárquica com numeração adequada
3. Linguagem técnica-jurídica apropriada
4. Cláusulas essenciais conforme o tipo de documento
5. Prazos e procedimentos em conformidade com a legislação
6. Inclusão de dispositivos de sustentabilidade quando aplicável
7. Critérios objetivos de julgamento
8. Sanções administrativas adequadas

**ESTRUTURA ESPERADA:**
- Cabeçalho institucional
- Preâmbulo com fundamento legal
- Cláusulas/itens numerados sequencialmente
- Especificações técnicas detalhadas
- Critérios de habilitação
- Prazos e condições de execução
- Penalidades e sanções
- Disposições finais

Gere o documento em formato HTML limpo (sem tags html, head, body), pronto para exibição em uma div. Use apenas tags de formatação como h1, h2, h3, p, ol, ul, li, strong, em.

O documento deve ser juridicamente sólido, tecnicamente preciso e administrativamente eficiente.`;
    }

    async callOpenAI(prompt) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.openaiApiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'Você é um especialista em licitações públicas brasileiras com conhecimento profundo da Lei nº 14.133/2021.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 4000,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`Erro da API: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    getTipoDocumentoName(tipo) {
        const tipos = {
            'edital': 'Edital de Licitação',
            'termo-referencia': 'Termo de Referência',
            'minuta-contrato': 'Minuta de Contrato',
            'aviso-licitacao': 'Aviso de Licitação'
        };
        return tipos[tipo] || tipo;
    }

    displayResult(content) {
        const resultContainer = document.getElementById('resultContainer');
        const resultContent = document.getElementById('resultContent');
        
        resultContent.innerHTML = content;
        resultContainer.style.display = 'block';
        resultContainer.classList.add('fade-in');
        
        // Scroll para o resultado
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    editDocument() {
        if (!this.currentDocument) return;
        
        const modal = document.getElementById('editModal');
        const textarea = document.getElementById('editableContent');
        
        // Converter HTML para texto editável
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.currentDocument.content;
        textarea.value = tempDiv.textContent || tempDiv.innerText || '';
        
        modal.style.display = 'flex';
    }

    closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
    }

    saveEditedDocument() {
        const textarea = document.getElementById('editableContent');
        const newContent = textarea.value;
        
        // Converter texto de volta para HTML básico
        const formattedContent = this.formatTextToHTML(newContent);
        
        this.currentDocument.content = formattedContent;
        this.displayResult(formattedContent);
        this.closeEditModal();
    }

    formatTextToHTML(text) {
        return text
            .split('\n\n')
            .map(paragraph => paragraph.trim())
            .filter(paragraph => paragraph.length > 0)
            .map(paragraph => {
                if (paragraph.match(/^\d+\./)) {
                    return `<p><strong>${paragraph}</strong></p>`;
                }
                return `<p>${paragraph}</p>`;
            })
            .join('');
    }

    async downloadPDF() {
        if (!this.currentDocument) return;

        try {
            // Usar uma biblioteca como jsPDF para gerar PDF
            // Por simplicidade, aqui vamos criar um download do HTML
            const content = this.currentDocument.content;
            const fileName = `${this.getTipoDocumentoName(this.currentDocument.tipo)}_${new Date().toISOString().split('T')[0]}.html`;
            
            const blob = new Blob([this.buildPDFContent(content)], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error('Erro ao baixar PDF:', error);
            this.showError('Erro ao gerar download. Tente novamente.');
        }
    }

    buildPDFContent(content) {
        return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>PIL - Documento Gerado</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
        }
        h1, h2, h3 { color: #1e3a5f; margin-top: 2rem; }
        h1 { text-align: center; border-bottom: 2px solid #4fb3c7; padding-bottom: 1rem; }
        ol, ul { margin-left: 2rem; }
        li { margin-bottom: 0.5rem; }
        .header { text-align: center; margin-bottom: 2rem; }
        .footer { margin-top: 2rem; text-align: center; font-size: 0.9em; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>PIL</h1>
        <p>Plataforma Integrada de Licitações</p>
        <p>Documento gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
    </div>
    
    ${content}
    
    <div class="footer">
        <p>Documento gerado pela PIL - Plataforma Integrada de Licitações</p>
        <p>Em conformidade com a Lei nº 14.133/2021</p>
    </div>
</body>
</html>`;
    }

    saveToHistory() {
        if (!this.currentDocument) return;

        this.documentHistory.unshift(this.currentDocument);
        localStorage.setItem('pil_history', JSON.stringify(this.documentHistory));
        this.loadHistory();
        
        this.showSuccess('Documento salvo no histórico com sucesso!');
    }

    loadHistory() {
        const historyList = document.getElementById('historicoList');
        
        if (this.documentHistory.length === 0) {
            historyList.innerHTML = '<p class="text-center">Nenhum documento no histórico.</p>';
            return;
        }

        historyList.innerHTML = this.documentHistory.map((doc, index) => `
            <div class="historico-item">
                <div class="historico-info">
                    <h4>${this.getTipoDocumentoName(doc.tipo)}</h4>
                    <p>${doc.objeto.substring(0, 100)}${doc.objeto.length > 100 ? '...' : ''}</p>
                    <small>Criado em ${new Date(doc.data).toLocaleDateString('pt-BR')}</small>
                </div>
                <div class="historico-actions">
                    <button class="btn btn-outline" onclick="app.viewHistoryDocument(${index})">Visualizar</button>
                    <button class="btn btn-outline" onclick="app.deleteHistoryDocument(${index})">Excluir</button>
                </div>
            </div>
        `).join('');
    }

    viewHistoryDocument(index) {
        const doc = this.documentHistory[index];
        this.currentDocument = doc;
        this.displayResult(doc.content);
        this.navigateToSection('documentos');
        
        // Atualizar navegação ativa
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('[href="#documentos"]').classList.add('active');
    }

    deleteHistoryDocument(index) {
        if (confirm('Tem certeza que deseja excluir este documento do histórico?')) {
            this.documentHistory.splice(index, 1);
            localStorage.setItem('pil_history', JSON.stringify(this.documentHistory));
            this.loadHistory();
        }
    }

    filterHistory(searchTerm) {
        const items = document.querySelectorAll('.historico-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            item.style.display = matches ? 'flex' : 'none';
        });
    }

    filterHistoryByType(type) {
        const items = document.querySelectorAll('.historico-item');
        items.forEach(item => {
            const docType = item.querySelector('h4').textContent;
            const matches = !type || docType.includes(this.getTipoDocumentoName(type));
            item.style.display = matches ? 'flex' : 'none';
        });
    }

    clearForm() {
        const form = document.getElementById('documentForm');
        form.reset();
        document.getElementById('resultContainer').style.display = 'none';
        this.currentDocument = null;
    }

    formatCurrency(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = (parseInt(value) / 100).toFixed(2);
        value = value.replace('.', ',');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        e.target.value = value;
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };

        notification.style.backgroundColor = colors[type];
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PILApp();
});

// Funções globais para callbacks dos botões do histórico
window.viewHistoryDocument = (index) => app.viewHistoryDocument(index);
window.deleteHistoryDocument = (index) => app.deleteHistoryDocument(index);