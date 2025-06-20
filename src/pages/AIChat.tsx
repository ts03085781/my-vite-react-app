import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { INFORMATION_OF_DEAN } from '@/constants/aiChat';
import { Message } from '@/types/aiChat';
import { MessageRole } from '@/constants/enum';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const AIChat: React.FC = () => {
  const { t } = useTranslation();
  const AI_Opening_remarks: Message = {
    role: MessageRole.Assistant,
    content: t('page.aiChat.aiOpeningRemarks'),
  };
  const [chatMessages, setChatMessages] = useState<Message[]>([
    AI_Opening_remarks,
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: MessageRole.User, content: userInput },
          {
            role: MessageRole.System,
            content: INFORMATION_OF_DEAN,
          },
        ],
      }),
    });

    const data = await response.json();

    setChatMessages([
      ...chatMessages,
      { role: MessageRole.User, content: userInput },
      {
        role: MessageRole.Assistant,
        content: data.choices[0].message.content || '',
      },
    ]);
    setUserInput('');
  };

  return (
    <div>
      {/* 標題 */}
      <h1 className="text-2xl font-bold mb-4">{t('page.aiChat.title')}</h1>

      <div className="flex flex-col h-[calc(100vh-250px)] max-w-[550px] mx-auto">
        {/* 對話訊息顯示區 */}
        <div className="flex-1 p-4 overflow-y-auto border rounded-lg mb-4">
          {/* 這裡未來會放訊息氣泡 */}
          {chatMessages.map((chatMessage, index) => {
            if (chatMessage.role === MessageRole.User) {
              return (
                <div className="flex justify-end mb-3 pl-8" key={index}>
                  <div className="bg-white border rounded-2xl px-4 py-2 inline-block">
                    {chatMessage.content}
                  </div>
                </div>
              );
            }
            if (chatMessage.role === MessageRole.Assistant) {
              return (
                <div className="mb-3 pr-8" key={index}>
                  <div className="bg-gray-100 border rounded-2xl px-4 py-2 inline-block">
                    {chatMessage.content}
                  </div>
                </div>
              );
            }
          })}
        </div>
        {/* 輸入區 */}
        <div className="flex items-center p-3 border rounded-lg">
          <Input
            type="text"
            placeholder={t('page.aiChat.placeholder')}
            className="flex-1 mr-2"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            type="primary"
            className="px-4 py-2 rounded-lg font-bold"
            onClick={handleSend}
          >
            {t('page.aiChat.send')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
