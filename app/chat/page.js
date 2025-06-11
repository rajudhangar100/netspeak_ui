'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const suggestedPrompts = [
  "Limit YouTube during work hours in zone1",
  "Prioritise Zoom for video calls",
  "Block Instagram completely",
  "Limit Netflix at night in zone2",
  "Prioritise Skype in zone1"
];

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setResponse(data.cli_commands?.join('\n') || 'No CLI commands returned.');
    } catch (err) {
      setResponse('Error fetching response.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-2">NetSpeak CLI Assistant</h1>
        <p className="text-gray-400">Describe your network issue. I’ll generate CLI commands for you.</p>
      </header>

      <div className="mb-4">
        <div className="flex gap-2 flex-wrap">
          {suggestedPrompts.map((prompt, idx) => (
            <Button key={idx} variant="outline" className="text-sm" onClick={() => setInput(prompt)}>
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="e.g., Block WhatsApp in zone2"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Generating...' : 'Submit'}
        </Button>
      </div>

      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="transition-all"
        >
          <Card className="bg-gray-800 text-green-400 whitespace-pre-wrap p-4">
            <CardContent>
              <code>{response}</code>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}