const Message = ({ text }: { text: string }) => {
  return (
    <div className="flex min-h-screen text-3xl justify-center items-center">
      <span>{text}</span>
    </div>
  );
};

export default Message;
