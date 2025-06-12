'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="font-sans text-white bg-black min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-900 shadow-md ">
        <h1 className="text-3xl font-bold text-green-400">NetSpeak</h1>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-green-300">About</a></li>
          <li><a href="#goal" className="hover:text-green-300">Our Goal</a></li>
          <li><Link href="/chat">Chatbot</Link></li>
        </ul>
      </nav>

      {/* Landing Section */}
      <img src='bg.jpg' alt='alt image' className='h-[100vh] w-full object-fill z-0 absolute'/>
      <header className="text-center h-[80vh] relative z-50 pb-20 pt-36 bg-gradient-to-r">
        
        <h2 className="text-5xl font-extrabold mb-6">Welcome to NetSpeak</h2>
        <p className="text-xl max-w-2xl mx-auto">Empowering users to diagnose and resolve network issues through AI-powered CLI command generation.</p>
        <Link href="/chat">
          <button className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-black rounded-full text-lg font-bold">Start Now</button>
        </Link>
      </header>

      {/* About Section */}
      <section id="about" className="px-8 py-16 bg-gray-800 relative">
        <h3 className="text-4xl font-bold mb-6">About NetSpeak</h3>
        <p className="text-lg leading-8 max-w-4xl">
          NetSpeak is a smart assistant designed to simplify network issue resolution. It understands natural language input and generates precise CLI commands tailored to Cisco environments. Whether you're facing slow speeds, blocked apps, or need bandwidth management, NetSpeak makes it easy to apply professional network configurations.
        </p>
      </section>

      {/* Our Goal Section */}
      <section id="goal" className="px-8 py-16 bg-black">
        <h3 className="text-4xl font-bold mb-8">Our Goal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-lg mb-6">
              Our mission is to bridge the gap between network management and accessibility for everyday users. Through cutting-edge AI and a clean user interface, we aim to provide reliable, understandable, and actionable solutions to networking challenges.
            </p>
            <ul className="list-disc list-inside">
              <li>Enable CLI command generation with ease</li>
              <li>Support for popular apps like YouTube, Zoom, WhatsApp</li>
              <li>Works with Cisco and VyOS systems</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold mb-4">Data Insights</h4>
            <div className="w-full h-64 bg-green-400 rounded-lg text-center pt-24 text-black text-xl font-bold">
              [Graph Placeholder]
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 p-6 text-center">
        <p>&copy; 2025 NetSpeak. All rights reserved.</p>
      </footer>
    </div>
  );
}

export function ChatbotPage() {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const suggestions = [
    'Block YouTube in zone1',
    'Prioritise Zoom in zone2',
    'Limit Netflix usage for 30 minutes in zone1'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setResponses([...responses, { question: input, answer: data.commands.join('\n') }]);
    setInput('');
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col p-6">
      <nav className="mb-4"><Link href="/" className="text-green-400">← Back to Home</Link></nav>
      <h2 className="text-3xl font-bold mb-6">NetSpeak CLI Chatbot</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setInput(s)}
            className="px-4 py-2 bg-gray-800 rounded-full hover:bg-gray-700"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="bg-gray-900 p-4 rounded-lg mb-4 flex-grow overflow-y-auto max-h-[50vh]">
        {responses.map((r, idx) => (
          <div key={idx} className="mb-6">
            <p className="text-green-400 font-semibold">User: {r.question}</p>
            <pre className="bg-gray-800 p-4 rounded mt-2 text-green-300 whitespace-pre-wrap">{r.answer}</pre>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 p-3 bg-gray-700 rounded text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your network issue..."
        />
        <button onClick={handleSend} className="bg-green-500 px-4 py-2 rounded font-bold hover:bg-green-600">Send</button>
      </div>
    </div>
  );
}
