/**
 * Dados de demonstração para a PIL
 * Exemplos práticos de licitações para facilitar o teste da plataforma
 */

const demoData = {
    exemplos: [
        {
            nome: "Aquisição de Equipamentos de Informática",
            dados: {
                tipoDocumento: "edital",
                objeto: "Aquisição de equipamentos de informática, incluindo computadores desktop, notebooks, impressoras multifuncionais e equipamentos de rede para modernização do parque tecnológico da Prefeitura Municipal.",
                modalidade: "pregao-eletronico",
                tipoLicitacao: "menor-preco",
                regimeExecucao: "empreitada-global",
                criterioJulgamento: "menor-preco",
                valorEstimado: "500.000,00",
                prazoExecucao: "60 dias",
                localExecucao: "Almoxarifado Central da Prefeitura - Rua das Flores, 123 - Centro",
                observacoes: "Equipamentos devem possuir certificação EPEAT Gold ou Energy Star. Garantia mínima de 3 anos on-site."
            }
        },
        {
            nome: "Contratação de Serviços de Limpeza",
            dados: {
                tipoDocumento: "termo-referencia",
                objeto: "Contratação de empresa especializada na prestação de serviços de limpeza, conservação e higienização das dependências dos prédios públicos municipais, com fornecimento de mão de obra, materiais, equipamentos e utensílios.",
                modalidade: "pregao-eletronico",
                tipoLicitacao: "menor-preco",
                regimeExecucao: "empreitada-unitario",
                criterioJulgamento: "menor-preco",
                valorEstimado: "1.200.000,00",
                prazoExecucao: "12 meses",
                localExecucao: "Diversos prédios da administração municipal conforme cronograma",
                observacoes: "Serviços devem seguir as normas da ANVISA. Funcionários devem ser treinados e uniformizados. Materiais ecologicamente corretos."
            }
        },
        {
            nome: "Obras de Pavimentação Asfáltica",
            dados: {
                tipoDocumento: "edital",
                objeto: "Execução de serviços de pavimentação asfáltica, incluindo recapeamento, sinalização horizontal e vertical, drenagem e calçadas, na Avenida Principal do município.",
                modalidade: "concorrencia",
                tipoLicitacao: "menor-preco",
                regimeExecucao: "empreitada-global",
                criterioJulgamento: "menor-preco",
                valorEstimado: "2.500.000,00",
                prazoExecucao: "8 meses",
                localExecucao: "Avenida Principal, do km 0 ao km 5, município de São José",
                observacoes: "Projeto executivo disponível. Obra sujeita a fiscalização do CREA. Garantia de 5 anos para pavimento asfáltico."
            }
        },
        {
            nome: "Fornecimento de Medicamentos",
            dados: {
                tipoDocumento: "pregao-eletronico",
                objeto: "Registro de preços para eventual aquisição de medicamentos diversos para atendimento das unidades de saúde do município, conforme especificações e quantidades estimadas no anexo I.",
                modalidade: "pregao-eletronico",
                tipoLicitacao: "menor-preco",
                regimeExecucao: "empreitada-unitario",
                criterioJulgamento: "menor-preco",
                valorEstimado: "800.000,00",
                prazoExecucao: "12 meses",
                localExecucao: "Central de Abastecimento Farmacêutico Municipal",
                observacoes: "Medicamentos devem estar registrados na ANVISA. Validade mínima de 24 meses. Entrega conforme cronograma de necessidades."
            }
        },
        {
            nome: "Contratação de Consultoria em TI",
            dados: {
                tipoDocumento: "minuta-contrato",
                objeto: "Contratação de empresa de consultoria especializada em tecnologia da informação para implementação de sistema integrado de gestão pública, incluindo treinamento e suporte técnico.",
                modalidade: "concorrencia",
                tipoLicitacao: "tecnica-preco",
                regimeExecucao: "empreitada-global",
                criterioJulgamento: "melhor-combinacao",
                valorEstimado: "1.800.000,00",
                prazoExecucao: "18 meses",
                localExecucao: "Secretaria de Administração e demais órgãos municipais",
                observacoes: "Empresa deve comprovar experiência mínima de 5 anos. Sistema deve ser desenvolvido em plataforma open source. Treinamento para 100 usuários."
            }
        }
    ],

    loadExample: function(index) {
        const exemplo = this.exemplos[index];
        if (!exemplo) return;

        // Preencher formulário com dados do exemplo
        const form = document.getElementById('documentForm');
        Object.keys(exemplo.dados).forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                input.value = exemplo.dados[field];
            }
        });

        // Mostrar notificação
        if (window.app) {
            window.app.showSuccess(`Exemplo "${exemplo.nome}" carregado com sucesso!`);
        }
    },

    createExampleButtons: function() {
        const container = document.createElement('div');
        container.className = 'demo-examples';
        container.innerHTML = `
            <div class="examples-header">
                <h3>📋 Exemplos Práticos</h3>
                <p>Clique em um exemplo para preencher automaticamente o formulário:</p>
            </div>
            <div class="examples-grid">
                ${this.exemplos.map((exemplo, index) => `
                    <button class="example-btn" onclick="demoData.loadExample(${index})">
                        <strong>${exemplo.nome}</strong>
                        <small>${exemplo.dados.objeto.substring(0, 60)}...</small>
                    </button>
                `).join('')}
            </div>
        `;

        // Adicionar estilos
        const style = document.createElement('style');
        style.textContent = `
            .demo-examples {
                background: var(--secondary-light);
                border: 1px solid var(--border);
                border-radius: var(--border-radius-lg);
                padding: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .examples-header h3 {
                color: var(--primary-navy);
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
            }
            
            .examples-header p {
                color: var(--text-secondary);
                margin-bottom: 1rem;
                font-size: 0.9rem;
            }
            
            .examples-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 0.75rem;
            }
            
            .example-btn {
                background: var(--white);
                border: 1px solid var(--border);
                border-radius: var(--border-radius);
                padding: 1rem;
                text-align: left;
                cursor: pointer;
                transition: var(--transition);
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .example-btn:hover {
                border-color: var(--primary-teal);
                box-shadow: var(--shadow);
                transform: translateY(-1px);
            }
            
            .example-btn strong {
                color: var(--primary-navy);
                font-size: 0.9rem;
            }
            
            .example-btn small {
                color: var(--text-secondary);
                font-size: 0.8rem;
                line-height: 1.3;
            }
            
            @media (max-width: 768px) {
                .examples-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);

        return container;
    },

    init: function() {
        // Aguardar o DOM estar carregado
        document.addEventListener('DOMContentLoaded', () => {
            const generatorForm = document.querySelector('.generator-form');
            if (generatorForm) {
                const examplesContainer = this.createExampleButtons();
                generatorForm.parentNode.insertBefore(examplesContainer, generatorForm);
            }
        });
    }
};

// Inicializar exemplos
demoData.init();

// Tornar disponível globalmente
window.demoData = demoData;