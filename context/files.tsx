import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import filesize from 'filesize';
import Cookie from 'js-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api';

export interface IImage {
  _id: string;
  name: string;
  size: number;
  key: string;
  url: string;
}

export interface IFile {
  id: string;
  name: string;
  readableSize: string;
  uploaded?: boolean;
  preview: string;
  file: File | null;
  progress?: number;
  error?: boolean;
  url: string;
}

interface IFileContextData {
  uploadedFiles: IFile[];
  deleteFile(id: string, token: string): void;
  handleUpload(file: any): void;
}

const FileContext = createContext<IFileContextData>({} as IFileContextData);

const FileProvider: React.FC = ({ children }) => {
  let token: String;

  AsyncStorage.getItem('@token', (error, result) => {
    if (error) {
      alert('Por favor faça login novamente');
    }

    token = result;
  })

  const itemID = Cookie.get('@itemID');

  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

  useEffect(() => {
    api.get<IImage[]>(`images/${itemID}`).then(res => {
      const imageFormatted: IFile[] = res.data.map(image => {
        return {
          ...image,
          id: image._id,
          preview: image.url,
          readableSize: filesize(image.size),
          file: null,
          error: false,
          uploaded: true,
        };
      });

      setUploadedFiles(imageFormatted);
    });
  }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  });

  const updateFile = useCallback((id, data) => {
    setUploadedFiles(state => state.map(file => (file.id === id ? { ...file, ...data } : file)));
  }, []);

  const processUpload = useCallback(
    (uploadedFile: IFile) => {
      const data = new FormData();

      if (uploadedFile.file) {
        data.append('file', uploadedFile.file, uploadedFile.name);
        data.append('itemID', itemID);
      }

      api.post('admin/image/upload', data, {
        headers: {
          authorization: token
        },
        onUploadProgress: progressEvent => {
          let progress: number = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          updateFile(uploadedFile.id, { progress });
        }
      })
        .then(res => {
          updateFile(uploadedFile.id, {
            uploaded: true,
            id: res.data._id,
            url: res.data.url,
          });
        })
        .catch(error => {
          updateFile(uploadedFile.id, {
            error: true,
          })
        })
    },
    [updateFile]
  );

  const handleUpload = useCallback(
    (files: File[]) => {
      const newUploadedFiles: IFile[] = files.map((file: File) => ({
        file,
        id: uuidv4(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: '',
      }));

      setUploadedFiles(state => state.concat(newUploadedFiles));
      newUploadedFiles.forEach(processUpload);
    },
    [processUpload]
  );

  const deleteFile = useCallback((id: string, token: string) => {
    api.delete(`/admin/image/delete/${id}`, { headers: { authorization: token } });
    setUploadedFiles(state => state.filter(file => file.id !== id));
  }, []);

  return (
    <FileContext.Provider value={{ uploadedFiles, deleteFile, handleUpload }}>
      {children}
    </FileContext.Provider>
  );
};

function useFiles(): IFileContextData {
  const context = useContext(FileContext);

  if (!context) throw new Error('useFiles must be used within FileProvider');

  return context;
}

export { FileProvider, useFiles };