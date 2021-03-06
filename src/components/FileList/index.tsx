import Cookie from 'js-cookie';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink, MdMoodBad } from 'react-icons/md';
import { useFiles, IFile } from '../../context/files';
import Switch from 'react-switch';

import styles from './filelist.module.css';

const FileList = () => {
  const token: any = Cookie.get('@token');

  const { uploadedFiles: files, deleteFile, changingFile } = useFiles();

  if (!files.length) {
    return (
      <span>
        <MdMoodBad
          style={{ marginLeft: '45%', marginTop: 10 }}
          size={24}
          color='#D5D2D3'
        />
      </span>
    );
  }

  return (
    <ul className={styles.container}>
      {files.map((uploadedFile: IFile) => (
        <li key={uploadedFile.id}>
          <div className={styles.fileinfo}>
            <div className={styles.preview}>
              <img src={uploadedFile.url ? uploadedFile.url : uploadedFile.preview} alt="" />
            </div>

            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{' '}
                {!!uploadedFile.url && (
                  <button onClick={e => deleteFile(uploadedFile.id, token)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </div>

          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#4C191B' },
                }}
                strokeWidth={10}
                text={String(uploadedFile.progress)}
                value={uploadedFile.progress || 0}
              />
            )}

            {uploadedFile.uploaded && (
              <Switch 
                checked={uploadedFile.isHomepage}
                onChange={e => changingFile(uploadedFile.id, token, uploadedFile.isHomepage)}
                checkedIcon={false}
                uncheckedIcon={false}
                height={20}
                width={40}
                handleDiameter={20}
                onColor='#4C191B'
              />
            )}

            {uploadedFile.url && (
              <a
                href={uploadedFile.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <MdLink
                  style={{ marginRight: 8 }}
                  size={24}
                  color='#222'
                />
              </a>
            )}

            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color='#78E5D5' />
            )}

            {uploadedFile.error && <MdError size={24} color='#E57878' />}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FileList;