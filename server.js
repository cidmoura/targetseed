const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Servir arquivos estáticos
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para proxy da OpenAI (opcional, caso haja problemas de CORS)
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt, apiKey } = req.body;
        
        if (!apiKey) {
            return res.status(400).json({ error: 'API key é obrigatória' });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
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
        res.json({ content: data.choices[0].message.content });

    } catch (error) {
        console.error('Erro ao chamar OpenAI:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint para logs de auditoria
app.post('/api/audit-log', (req, res) => {
    try {
        const { action, document, timestamp, user } = req.body;
        
        const logEntry = {
            timestamp: timestamp || new Date().toISOString(),
            action,
            document: {
                type: document.tipo,
                object: document.objeto,
                id: document.id
            },
            user: user || 'anonymous'
        };

        // Salvar no arquivo de log (em produção, usar um banco de dados)
        const logFile = path.join(__dirname, 'audit.log');
        fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
        
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar log:', error);
        res.status(500).json({ error: 'Erro ao salvar log de auditoria' });
    }
});

// Endpoint para estatísticas (opcional)
app.get('/api/stats', (req, res) => {
    try {
        const stats = {
            totalDocuments: 0,
            documentTypes: {},
            lastGenerated: null
        };

        // Ler logs de auditoria se existir
        const logFile = path.join(__dirname, 'audit.log');
        if (fs.existsSync(logFile)) {
            const logs = fs.readFileSync(logFile, 'utf8')
                .split('\n')
                .filter(line => line.trim())
                .map(line => JSON.parse(line));

            stats.totalDocuments = logs.filter(log => log.action === 'generate').length;
            
            logs.forEach(log => {
                if (log.action === 'generate' && log.document.type) {
                    stats.documentTypes[log.document.type] = 
                        (stats.documentTypes[log.document.type] || 0) + 1;
                }
            });

            const lastLog = logs[logs.length - 1];
            if (lastLog) {
                stats.lastGenerated = lastLog.timestamp;
            }
        }

        res.json(stats);
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
        res.status(500).json({ error: 'Erro ao obter estatísticas' });
    }
});

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 PIL - Plataforma Integrada de Licitações`);
    console.log(`📊 Servidor rodando na porta ${PORT}`);
    console.log(`🌐 Acesse: http://localhost:${PORT}`);
    console.log(`⚖️  Conformidade: Lei nº 14.133/2021`);
});

module.exports = app;