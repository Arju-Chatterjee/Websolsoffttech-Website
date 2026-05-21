const WhatsAppPopup = () => {
  return (
    <>
      <style>{`
        .whatsapp-popup {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 60px;
          height: 60px;
          background:  #25D366;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          box-shadow: 0 px 25px #0d5f26;
          transition: all 0.3s ease;
          animation: whatsappFloat 1s infinite ease-in-out;
          text-decoration: none;
        }

        .whatsapp-popup:hover {
          transform: scale(1.08);
        }

        @keyframes whatsappFloat {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-6px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @media (max-width: 768px) {
          .whatsapp-popup {
            width: 54px;
            height: 54px;
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>

      <a
        href="https://wa.me/919233770627"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-popup"
      >
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          width="28"
          height="28"
        >
          <path d="M19.11 17.21c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.15-1.34-.79-.71-1.33-1.58-1.49-1.85-.16-.27-.02-.41.11-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.98-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.22s.95 2.57 1.08 2.75c.13.18 1.87 2.86 4.53 4.01.63.27 1.13.44 1.51.56.63.2 1.2.17 1.65.1.5-.08 1.58-.65 1.8-1.27.22-.62.22-1.15.16-1.27-.07-.11-.24-.18-.51-.31zM16.01 3C8.83 3 3 8.74 3 15.82c0 2.5.73 4.93 2.1 7l-1.37 5 5.14-1.34a13.1 13.1 0 0 0 6.14 1.56h.01c7.18 0 13.01-5.74 13.01-12.82C29.02 8.74 23.19 3 16.01 3zm0 23.5h-.01a10.7 10.7 0 0 1-5.45-1.49l-.39-.23-3.05.79.81-2.96-.25-.4a10.3 10.3 0 0 1-1.64-5.55c0-5.74 4.72-10.41 10.53-10.41 2.81 0 5.44 1.08 7.43 3.05a10.3 10.3 0 0 1 3.08 7.36c0 5.74-4.72 10.41-10.54 10.41z" />
        </svg>
      </a>
    </>
  );
};

export default WhatsAppPopup;