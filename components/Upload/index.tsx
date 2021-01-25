import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../../context/files';

import styles from './upload.module.css';

const Upload = () => {
  const { handleUpload } = useFiles();

  const onDrop = useCallback(
    files => {
      handleUpload(files);
    },
    [handleUpload]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'],
    onDrop,
  });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <p className={styles.uploadMessage}>Arraste arquivos aqui</p>;
    }

    if (isDragReject) {
      return (
        <p
          className={styles.uploadMessage}
          style={{ color: '#E57878' }}
        >Arquivo não suportado</p>
      )
    }

    return <p className={styles.uploadMessage} style={{ color: '#78e5d5' }}>Solte os arquivos aqui</p>;
  }, [isDragActive, isDragReject]);

  return (
    <div className={styles.dropzone_container} {...getRootProps()}>
      <input {...getInputProps()} />
      {renderDragMessage()}
    </div>
  );
}

export default Upload;