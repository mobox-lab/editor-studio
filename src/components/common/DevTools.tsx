import Script from 'next/script';

export default function DevTools() {
  return (
    <>
      <Script id="eruda" strategy="beforeInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/eruda/3.4.1/eruda.min.js" />
      <Script id="eruda-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: 'window.eruda.init()' }} />
    </>
  );
}
