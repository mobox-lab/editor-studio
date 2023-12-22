import Script from 'next/script';

export default function DevTools() {
  return (
    <>
      <Script id="eruda" strategy="beforeInteractive" src="https://cdn.bootcdn.net/ajax/libs/eruda/3.0.1/eruda.js" />
      <Script id="eruda-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: 'window.eruda.init()' }} />
    </>
  );
}
