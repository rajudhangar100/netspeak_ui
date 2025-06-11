'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  const [typedText, setTypedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setTypedText('');
    try {
      const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaint: input })
      });
      const data = await res.json();
  
      const result = data.cli_commands?.join('\n') || 'No CLI commands returned.';
      setResponse(result);
    } catch (err) {
      setResponse('Error fetching response.');
    }
    setLoading(false);
  };

  // Typewriter effect
  useEffect(() => {
    console.log("response: ",response)
    if (!response) return;
    let i = -1;
    const interval = setInterval(() => {
      setTypedText(prev => prev + response[i]);
      i++;
      if (i >= response.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [response]);

  return (

    <div className="min-h-screen bg-gray-950 text-white px-4 sm:px-8 py-6 font-sans">
        <div className="container mx-auto w-[90%]">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-900 shadow-md rounded-2xl mb-6">
        <h1 className="text-3xl font-bold text-green-400 cursor-pointer" ><Link href={"/"}>NetSpeak</Link></h1>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-green-300">About</a></li>
          <li><a href="#goal" className="hover:text-green-300">Our Goal</a></li>
          <li><Link href="/chat" className='cursor-pointer hover:text-green-300'>Chatbot</Link></li>
        </ul>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-semibold mb-2">Describe your network issue</h2>
        <p className="text-gray-400">We’ll generate CLI commands for you based on your input.</p>
      </header>

      {/* Chat Input */}
      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="e.g., Block WhatsApp in zone2"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow bg-gray-800 text-white border border-gray-700"
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          {loading ? 'Generating...' : 'Submit'}
        </Button>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        
        {/* Suggestions */}
        <div className="bg-gray-900 border w-[40vw] shrink border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3 text-green-300">Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="text-sm text-black bg-white hover:bg-gray-200"
                onClick={() => setInput(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>

        {/* Response output */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 border border-gray-700 rounded-lg p-4 w-full"
        >
          <h3 className="text-lg font-medium mb-3 text-green-300">Generated CLI Commands</h3>
          <Card className="bg-black text-green-400 p-4 min-h-[150px]">
            <CardContent>
              <pre className="whitespace-pre-wrap font-mono text-sm">{typedText || '...'}</pre>
            </CardContent>
          </Card>
        </motion.div>
       </div>
         </div>
      </div>
  );
}
