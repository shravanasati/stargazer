import { useEffect, useRef } from 'react';

export default function HTMLRenderer({ htmlCode }: { htmlCode: string }) {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		if (iframeRef.current) {
			const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
			if (doc) {
				doc.open();
				doc.write(htmlCode);
				doc.close();
			}
		}
	}, [htmlCode]);

	return (
		<iframe
			ref={iframeRef}
			style={{ width: '100%', height: '100vh', border: 'none' }}
		/>
	);
}