
"use client";

import { useState, useRef } from "react";

type SpeechRecognitionResult = {
  transcript: string;
};

type SpeechRecognitionEvent = {
  results: ArrayLike<ArrayLike<SpeechRecognitionResult>>;
};

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechWindow = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
};

const orders = [
  {
    id: "ORD-101",
    customer: "Priya Sharma",
    product: "Vitamin C Serum 30ml",
    amount: "₹699",
    status: "Out for Delivery",
    courier: "BlueDart BD-982103",
    delivery: "Expected by 6 PM today",
  },
  {
    id: "ORD-102",
    customer: "Rahul Verma",
    product: "Hydrating Sunscreen SPF 50",
    amount: "₹499",
    status: "Delivered",
    courier: "Delhivery DL-441029",
    delivery: "Delivered 14 days ago",
  },
  {
    id: "ORD-103",
    customer: "Ananya Patel",
    product: "Green Tea Face Wash + Toner",
    amount: "₹850",
    status: "Processing",
    courier: "Not shipped yet",
    delivery: "Ordered 3 hours ago",
  },
];

function get_order_details(order_id: string) {
  const normalizedOrderId = order_id
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "-");

  const order = orders.find(
    (item) => item.id === normalizedOrderId
  );

  if (!order) {
    return {
      found: false,
      message: `Order ${normalizedOrderId} was not found.`,
    };
  }

  return {
    found: true,
    order,
  };
}


export default function Home() {
  const [callActive, setCallActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Ready");
const [heardText, setHeardText] = useState("");

const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const [orderId, setOrderId] = useState("ORD-101");
  const [transcript, setTranscript] = useState<string[]>([]);
  const [summary, setSummary] = useState<{
    customer_intent: string;
    order_id: string;
    resolution_status: string;
    call_summary: string;
  } | null>(null);
  const [callHistory, setCallHistory] = useState<
  {
    call_id: string;
    order_id: string;
    customer_intent: string;
    resolution_status: string;
    call_summary: string;
    transcript: string[];
    ended_at: string;
  }[]
>([]);

  const order = orders.find((item) => item.id === orderId);
  function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    setVoiceStatus("Speech output unavailable");
    return;
  }

  window.speechSynthesis.cancel();

  const message = new SpeechSynthesisUtterance(text);
  message.lang = "en-IN";
  message.rate = 0.95;

  message.onstart = () => setVoiceStatus("Speaking");
  message.onend = () => setVoiceStatus("Ready");

  window.speechSynthesis.speak(message);
}

function startListening() {
  const browserWindow = window as SpeechWindow;
  const Recognition =
    browserWindow.SpeechRecognition ??
    browserWindow.webkitSpeechRecognition;

  if (!Recognition) {
    setVoiceStatus("Speech recognition unsupported");
    setTranscript((previous) => [
      ...previous,
      "Aria: Speech recognition is not supported in this browser. Please try a supported version of Chrome.",
    ]);
    return;
  }

  const recognition = new Recognition();
  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript.trim();
    setHeardText(text);
    setTranscript((previous) => [...previous, `You: ${text}`]);

   
const spoken = text.toLowerCase();
let reply =
  "I'm sorry, I can help with order status, delivery, cancellation, returns, damaged products, and cash on delivery. Could you tell me a little more?";


const orderMatch = spoken.match(/\b(?:ord[-\s]*|order\s*)(\d+)\b/i);

if (orderMatch && !["101", "102", "103"].includes(orderMatch[1])) {
  const result = get_order_details(`ORD-${orderMatch[1]}`);

  reply = result.found
    ? `I found your order ${orderMatch[1]}, but I need to check its latest details.`
    : `I'm sorry, I couldn't find order ${orderMatch[1]} in our system. Could you please check your order number and try again?`;

} else if (
  spoken.includes("ord 101") ||
  spoken.includes("order 101")
) {
  const result = get_order_details("ORD-101");

  if (result.found) {
    reply = result.order
      ? `Your order ORD 101 for ${result.order.product} is ${result.order.status.toLowerCase()}. It is being delivered by ${result.order.courier}. ${result.order.delivery}.`
      : "I couldn't retrieve the details for order 101.";
  } else {
    reply = "I'm sorry, I couldn't find order 101 in our system.";
  }
}

 else if (
  spoken.includes("ord 102") ||
  spoken.includes("order 102")
) {
  const result = get_order_details("ORD-102");

  if (result.found) {
    reply =
      "Order O R D 102 was delivered 14 days ago. Our standard return window is 7 days after delivery, so it is outside the return window.";
  } else {
    reply = "I'm sorry, I couldn't find order 102 in our system.";
  }
} else if (
  spoken.includes("ord 103") ||
  spoken.includes("order 103")
) {
  const result = get_order_details("ORD-103");

  if (result.found) {
    reply =
      "Order O R D 103 is still processing. It can be cancelled while it remains in processing.";
  } else {
    reply = "I'm sorry, I couldn't find order 103 in our system.";
  }
}

   
if (orderMatch && !["101", "102", "103"].includes(orderMatch[1])) {
  const result = get_order_details(`ORD-${orderMatch[1]}`);

  reply = result.found
    ? `I found your order ${orderMatch[1]}, but I need to check its latest details.`
    : `I'm sorry, I couldn't find order ${orderMatch[1]} in our system. Could you please check your order number and try again?`;

} else if (
  spoken.includes("ord 101") ||
  spoken.includes("order 101")
) {
  const result = get_order_details("ORD-101");

  if (result.found) {
    reply =
      "Order O R D 101 is out for delivery with BlueDart. It is expected by 6 PM today.";
  } else {
    reply = "I'm sorry, I couldn't find order 101 in our system.";
  }

} else if (
  spoken.includes("ord 102") ||
  spoken.includes("order 102")
) {
  const result = get_order_details("ORD-102");

  if (result.found) {
    reply =
      "Order O R D 102 was delivered 14 days ago. Our standard return window is 7 days after delivery, so it is outside the return window.";
  } else {
    reply = "I'm sorry, I couldn't find order 102 in our system.";
  }

} else if (
  spoken.includes("ord 103") ||
  spoken.includes("order 103")
) {
  const result = get_order_details("ORD-103");

  if (result.found) {
    reply =
      "Order O R D 103 is still processing. It can be cancelled while it remains in processing.";
  } else {
    reply = "I'm sorry, I couldn't find order 103 in our system.";
  }
}
 else if (spoken.includes("shipping") || spoken.includes("delivery charge")) {
      reply =
        "Delivery is free for orders above 499 rupees. Orders below 499 rupees have a 50 rupee delivery fee. Delivery usually takes 3 to 5 business days.";
    } else if (spoken.includes("cancel")) {
      reply =
        "An order can be cancelled while it is processing. Once shipped or out for delivery, it cannot be cancelled, but you may refuse delivery at the doorstep.";
    } else if (spoken.includes("return")) {
      reply =
        "Returns are accepted within 7 days of delivery for unopened and unused products in their original packaging.";
    } else if (
      spoken.includes("damaged") ||
      spoken.includes("defective")
    ) {
      reply =
        "Please report a damaged or defective product within 48 hours and provide photos so the replacement request can be reviewed.";
    } else if (spoken.includes("cash on delivery") || spoken.includes("cod")) {
      reply =
        "Cash on delivery is available for orders up to 2,500 rupees. You can pay by cash or UPI at your doorstep.";
    }

    setTranscript((previous) => [...previous, `Aria: ${reply}`]);
    speak(reply);
  };

 recognition.onerror = () => {
  setVoiceStatus("Microphone error");
  setTranscript((previous) => [
    ...previous,
    "System: Microphone error. Check Chrome microphone permissions.",
  ]);
};
  recognition.onend = () => {
    recognitionRef.current = null;

    setVoiceStatus("Ready");
  };

  recognitionRef.current = recognition;
  setVoiceStatus("Listening");

  try {
    recognition.start();
  } catch {
    setVoiceStatus("Could not start microphone");
  }
}
 
function startCall() {
  // Start a fresh transcript for this call
  setTranscript([
    "Aria: Hello! Welcome to Aura Skincare. I'm Aria. How can I help you today?",
  ]);

  // Clear the previous call summary
  setSummary(null);

  setCallActive(true);
  setVoiceStatus("Call Active");

  speak(
    "Hello! Welcome to Aura Skincare. I'm Aria. How can I help you today?"
  );
}
   
function endCall() {
  // Stop voice recognition
  recognitionRef.current?.stop();
  recognitionRef.current = null;

  setCallActive(false);
  setVoiceStatus("Call Ended");

  const farewell =
    "Aria: Thank you for contacting Aura Skincare. Have a lovely day!";

  const finalTranscript = [...transcript, farewell];
  setTranscript(finalTranscript);

 const conversation = finalTranscript.join(" ");

// Detect order ID from the conversation

const customerConversation = transcript
  .filter((line) => line.startsWith("You:"))
  .join(" ")
  .toLowerCase();

const detectedOrderMatch = customerConversation.match(
  /\b(?:ord[-\s]*|order\s*)(\d+)\b/i
);

const detectedOrderId = detectedOrderMatch
  ? `ORD-${detectedOrderMatch[1]}`
  : "";

const matchedOrder = detectedOrderId
  ? orders.find((item) => item.id === detectedOrderId)
  : undefined;

// Identify customer intent
let customerIntent = "General customer support";

if (/return|refund/i.test(customerConversation)) {
  customerIntent = "Return or refund";
} else if (/cancel/i.test(customerConversation)) {
  customerIntent = "Cancel order";
} else if (/damaged|defective|broken/i.test(customerConversation)) {
  customerIntent = "Damaged or defective product";
} else if (
  /\b(cash on delivery|cod)\b/i.test(customerConversation)
) {
  customerIntent = "Cash on delivery";
} else if (
  /shipping|delivery charge|delivery fee|shipping fee/i.test(customerConversation)
) {
  customerIntent = "Shipping inquiry";
} else if (
  /track|where.*order|who is my order|status.*order|order status|delivery status|arriv/i.test(customerConversation)
) {
  customerIntent = "Track order";
}  const resolutionStatus = matchedOrder
    ? "Order information provided"
    : "Needs review";

  const callSummary = conversation.slice(0, 1000);

  // Create the summary for this call
  const newSummary = {
    customer_intent: customerIntent,
    order_id: detectedOrderId,
    resolution_status: resolutionStatus,
    call_summary: callSummary,
  };

  setSummary(newSummary);

  // Save this completed call in call history
  setCallHistory((previous) => [
    ...previous,
    {
      call_id: `CALL-${Date.now()}`,
      ...newSummary,
      transcript: finalTranscript,
      ended_at: new Date().toISOString(),
    },
  ]);
}
 function askAboutOrder() {
    if (!order) {
      setTranscript((previous) => [
        ...previous,
        `You: Please check order ${orderId}.`,
        "Aria: I couldn't find that order. Please check the order ID and try again.",
      ]);
      return;
    }

    setTranscript((previous) => [
      ...previous,
      `You: Can you check order ${order.id}?`,
      `Aria: ${order.customer}'s order for ${order.product} is currently ${order.status}. ${order.delivery}.`,
    ]);

    setSummary({
      customer_intent: "Order status inquiry",
      order_id: order.id,
      resolution_status: "Order details retrieved",
      call_summary: `${order.product} — ${order.status}. ${order.delivery}.`,
    });
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] p-4 text-[#252820] sm:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#74816b]">
              Aura Skincare
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              AI Customer Care
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Voice support dashboard · Assessment demo
            </p>
          </div>
          <div className="rounded-full border border-[#dce2d4] bg-white px-4 py-2 text-sm">
            <span
              className={`mr-2 inline-block h-2 w-2 rounded-full ${
                callActive ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {callActive ? "Call active" : "Ready to connect"}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[#e7e4db] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8eddf] text-2xl">
                ✿
              </div>
              <div>
                <h2 className="text-xl font-semibold">Aria</h2>
                <p className="text-sm text-gray-500">
                  Aura Skincare Voice Assistant
                </p>
                <p className="mt-1 text-xs text-[#74816b]">
                  Friendly · Professional · Concise
                </p>
              </div>
            </div>

            <div className="my-8 rounded-2xl bg-[#f7f8f3] p-5">
              <p className="text-sm font-medium text-gray-500">CALL STATUS</p>
              <h3 className="mt-2 text-2xl font-semibold">
                {callActive ? "Conversation in progress" : "Ready when you are"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {callActive
                  ? "This is the initial dashboard demo. Live microphone and AI responses are not connected yet."
                  : "Start a demo call or test an order lookup to explore the dashboard."}
              </p>
            </div>

<div className="flex flex-wrap gap-3">
  <button
    onClick={startCall}
    disabled={callActive}
    className="rounded-full bg-[#344a35] px-6 py-3 font-medium text-white hover:bg-[#263a28] disabled:opacity-50"
  >
    ▶ Start Call
  </button>

  <button
    onClick={endCall}
    disabled={!callActive}
    className="rounded-full border border-gray-300 px-6 py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
  >
    ■ End Call
  </button>

  <button
    onClick={startListening}
    disabled={!callActive || voiceStatus === "Listening"}
    className="rounded-full bg-[#e8eddf] px-6 py-3 font-medium text-[#344a35] disabled:opacity-50"
  >
    🎙 Speak to Aria
  </button>
</div>

<p className="mt-3 text-sm text-gray-600">
  Voice status: {voiceStatus}
</p>

{heardText && (
  <p className="mt-2 text-sm text-gray-600">
    Last heard: {heardText}
  </p>
)}

<div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="font-semibold">Test an order lookup</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a sample order from the assessment.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <select
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                  className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white p-3"
                  aria-label="Select order"
                >
                  {orders.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} — {item.customer}
                    </option>
                  ))}
                </select>
                <button
                  onClick={askAboutOrder}
                  className="rounded-xl bg-[#e8eddf] px-4 py-3 font-medium text-[#344a35] hover:bg-[#dce5d1]"
                >
                  Check Order
                </button>
              </div>
              {order && (
                <div className="mt-4 rounded-xl border border-gray-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{order.id}</p>
                    <span className="rounded-full bg-[#edf2e8] px-3 py-1 text-xs">
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{order.customer}</p>
                  <p className="mt-1 text-sm text-gray-600">{order.product}</p>
                  <p className="mt-2 text-sm font-medium">{order.amount}</p>
                  <p className="mt-1 text-xs text-gray-500">{order.courier}</p>
                  <p className="mt-1 text-xs text-gray-500">{order.delivery}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-[#e7e4db] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Conversation transcript</h2>
              <p className="mt-1 text-sm text-gray-500">
                Demo messages appear here in chronological order.
              </p>
              <div className="mt-5 max-h-64 min-h-36 space-y-3 overflow-y-auto">
                {transcript.length === 0 ? (
                  <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                    Your conversation will appear here.
                  </p>
                ) : (
                  transcript.map((line, index) => (
                    <p
                      key={`${index}-${line}`}
                      className="rounded-xl bg-[#f7f8f3] p-3 text-sm leading-6"
                    >
                      {line}
                    </p>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-[#e7e4db] bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Call summary</h2>
              <p className="mt-1 text-sm text-gray-500">
                Structured output preview
              </p>
              {summary ? (
                <pre className="mt-4 overflow-x-auto rounded-xl bg-[#252820] p-4 text-xs leading-6 text-[#e9efdf]">
                  {JSON.stringify(summary, null, 2)}
                </pre>
              ) : (
                <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                  Your structured call summary will appear here after testing an
                  order or ending a demo call.
                </p>
              )}
           
            </section>

            {/* Call History */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Call History</h2>
              <p className="mt-1 text-sm text-gray-500">
                Previously completed demo calls
              </p>

              {callHistory.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {[...callHistory].reverse().map((call) => (
                    <div
                      key={call.call_id}
                      className="rounded-xl border border-gray-200 p-4"
                    >
                      <p className="font-semibold">{call.call_id}</p>
                      <p className="mt-2 text-sm">
                        <strong>Intent:</strong> {call.customer_intent}
                      </p>
                      <p className="text-sm">
                        <strong>Order ID:</strong> {call.order_id}
                      </p>
                      <p className="text-sm">
                        <strong>Status:</strong> {call.resolution_status}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {call.call_summary}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(call.ended_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                  No call history yet. Complete a demo call to see it here.
                </p>
              )}
            </section>
          </div>
        </section>


        <footer className="mt-8 text-center text-xs text-gray-500">
          Aura Skincare · AI Voice Agent Assessment Prototype
        </footer>
      </div>
    </main>
  );
}
