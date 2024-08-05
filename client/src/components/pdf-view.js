import React from 'react';
import { Worker, Viewer, LocalizationMap} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// export default function PDFView(props) {
//     const [pdfFile, setPdfFile] = useState(null);

//     useEffect(() => {
//         axios.get(`http://localhost:8000/api/show-pdf/${props?.data}`)
//             .then(res => {
//                 if (res.data.success) {
//                     setPdfFile(res.data.filePDF);
//                 }
//             })
//             .catch(error => console.log(error));
//     }, [pdfFile]);

//     return (<><Worker workerUrl={"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"}>
//         {pdfFile && <>
//         <div style={{border: '1px solid rgba(0, 0, 0, 0.3)', height: '750px',}}>
//             <Viewer fileUrl={`http://localhost:8000/${pdfFile}`} 
//             enableSmoothScroll={false}
//             httpHeaders={{'Access-Control-Allow-Origin': '*',}} 
//             withCredentials={false}/>
//         </div></>}
//     </Worker></>);
// }
export default function PDFView(props) {
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        if (props?.data) {
            axios.get(`http://localhost:8000/api/show-pdf/${props.data}`)
                .then(res => {
                    if (res.data.success) {
                        setPdfFile(res.data.filePDF);
                    }
                })
                .catch(error => console.log(error));
        }
    }, [props.data]); // Chỉ gọi API khi props.data thay đổi

    return (
        <>
            <Worker workerUrl={"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js"}>
                {pdfFile && (
                    <div style={{ border: '1px solid rgba(0, 0, 0, 0.3)', height: '750px' }}>
                        <Viewer
                            fileUrl={pdfFile} // Không cần thêm `http://localhost:8000/` vào đây
                            enableSmoothScroll={false}
                            httpHeaders={{ 'Access-Control-Allow-Origin': '*' }}
                            withCredentials={false}
                        />
                    </div>
                )}
            </Worker>
        </>
    );
}