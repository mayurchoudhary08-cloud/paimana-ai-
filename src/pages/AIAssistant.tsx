import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  Building,
  MapPin,
  Clock
} from 'lucide-react';
import { queryProjectDataset, AssistantMessage } from '../utils/queryEngine';
import { MOCK_PROJECTS } from '../data/projects';
import { RiskBadge } from '../components/common/RiskBadge';
import { getRiskLevel, calculateRiskScore } from '../utils/riskScore';
import { formatCurrency } from '../utils/calculations';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `### Welcome to PAIMANA AI Assistant 👋\n\nI am your predictive infrastructure monitoring copilot. I analyze real-time project risk factors, cost escalation, schedule variance, and milestone health across the national portfolio.\n\nYou can ask me natural-language questions about specific projects, sectors, states, or high-risk bottlenecks.`,
      sourceNote: 'Generated from simulated project dataset.',
      suggestedActions: [
        { label: 'What projects have highest risk scores?', query: 'What projects have the highest risk scores?' },
        { label: 'Which projects show cost escalation risk?', query: 'Which projects show cost escalation risk?' },
        { label: 'Show high-risk projects in Maharashtra', query: 'Show high-risk projects in Maharashtra' },
        { label: 'Which sectors have the highest average delay?', query: 'Which sectors have the highest average delay?' }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: q
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI reasoning latency
    setTimeout(() => {
      const response = queryProjectDataset(q, MOCK_PROJECTS);
      const botMsg: AssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.text,
        sourceNote: 'Generated from demo project dataset.',
        matchedProjects: response.matchedProjects,
        metrics: response.metrics,
        suggestedActions: response.suggestedActions
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const renderFormattedText = (text: string, isUser: boolean) => {
    if (isUser) {
      return <p className="text-white whitespace-pre-wrap">{text}</p>;
    }

    const formatInlineBold = (str: string) => {
      const parts = str.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    return text.split('\n\n').map((paragraph, pIdx) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={pIdx} className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
            {formatInlineBold(paragraph.replace('### ', ''))}
          </h3>
        );
      }
      if (paragraph.startsWith('#### ')) {
        return (
          <h4 key={pIdx} className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-300 pt-1">
            {formatInlineBold(paragraph.replace('#### ', ''))}
          </h4>
        );
      }

      const lines = paragraph.split('\n');
      const isBulletList = lines.some(l => l.trim().startsWith('- ') || /^\d+\.\s/.test(l.trim()));

      if (isBulletList) {
        return (
          <ul key={pIdx} className="space-y-1.5 pl-1 my-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('- ')) {
                return (
                  <li key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span>{formatInlineBold(trimmed.slice(2))}</span>
                  </li>
                );
              }
              if (/^\d+\.\s/.test(trimmed)) {
                const numMatch = trimmed.match(/^(\d+)\.\s(.*)$/);
                return (
                  <li key={lIdx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">{numMatch ? numMatch[1] : ''}.</span>
                    <span>{formatInlineBold(numMatch ? numMatch[2] : trimmed)}</span>
                  </li>
                );
              }
              return <p key={lIdx} className="text-gray-700 dark:text-gray-300">{formatInlineBold(trimmed)}</p>;
            })}
          </ul>
        );
      }

      return (
        <p key={pIdx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {formatInlineBold(paragraph)}
        </p>
      );
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
      {/* Assistant Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500 to-cyan-500 text-white shadow-md">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">PAIMANA AI Assistant</h2>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-950 border border-purple-800/60 px-2 py-0.2 rounded-full">
                Rule Engine / LLM Ready
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Ask questions about project risks, delays, costs, and mitigation playbooks.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages(messages.slice(0, 1))}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-xs flex items-center gap-1"
            title="Clear Chat History"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-bold ${
                msg.sender === 'user'
                  ? 'border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                  : 'border-purple-500/40 bg-purple-500/20 text-purple-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-3 flex-1 min-w-0">
              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
                }`}
              >
                {/* Formatted Text Content */}
                <div className="space-y-2">
                  {renderFormattedText(msg.text, msg.sender === 'user')}
                </div>

                {/* Metrics Pill Grid if returned */}
                {msg.metrics && msg.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-3 border-t border-gray-200 dark:border-gray-800">
                    {msg.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="rounded-xl bg-white dark:bg-gray-900 p-2 text-center border border-gray-200 dark:border-gray-800">
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 block">{m.label}</span>
                        <strong className={`font-mono text-xs sm:text-sm font-bold ${m.color || 'text-blue-600 dark:text-blue-400'}`}>
                          {m.value}
                        </strong>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matched Projects Cards */}
                {msg.matchedProjects && msg.matchedProjects.length > 0 && (
                  <div className="space-y-2 pt-3 mt-3 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Referenced Project Assets ({msg.matchedProjects.length})
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.matchedProjects.map(p => {
                        const score = p.risk_score || calculateRiskScore(p);
                        const level = getRiskLevel(score);

                        return (
                          <Link
                            key={p.project_id}
                            to={`/projects/${p.project_id}`}
                            className="group flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-400 hover:bg-gray-100 dark:bg-gray-800 transition-all text-xs"
                          >
                            <div className="space-y-1 min-w-0 pr-2">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                  {p.project_id}
                                </span>
                                <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:text-blue-300 transition-colors truncate max-w-[280px]">
                                  {p.project_name}
                                </span>
                              </div>
                              <div className="text-[11px] text-gray-500 dark:text-gray-400">
                                {p.state} • {formatCurrency(p.revised_cost || p.approved_cost)} • {p.physical_progress}% Progress
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <RiskBadge level={level} score={score} size="sm" />
                              <ArrowRight className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Source Note & Suggested Queries */}
              {msg.sourceNote && (
                <span className="text-[10px] text-gray-400 dark:text-gray-500 italic block pl-1">
                  {msg.sourceNote}
                </span>
              )}

              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.suggestedActions.map((action, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => handleSend(action.query)}
                      className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2.5 py-1 text-xs text-gray-700 dark:text-gray-300 hover:border-purple-500/50 hover:text-purple-300 transition-all"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-md mr-auto animate-fade-in">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-purple-500/40 bg-purple-500/20 text-purple-300 text-xs">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl rounded-tl-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3.5 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span>Querying PAIMANA risk engine...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask about project risks, delays, Maharashtra, cost escalation, Western DFC..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 pl-4 pr-12 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-slate-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="absolute right-2 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
