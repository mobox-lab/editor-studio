type MessageProps = {
  title?: JSX.Element | string;
  message?: JSX.Element | string;
};

export default function Message({ title, message }: MessageProps) {
  return (
    <div>
      {title && <h5 className="text-lg/5.5 font-semibold">{title}</h5>}
      {message && <div className="mt-3.5 text-sm">{message}</div>}
    </div>
  );
}
