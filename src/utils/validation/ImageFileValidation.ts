import { MAX_FILE_SIZE_MB, AllowedTypes } from '../../constants/imageConst';

export const isValidFileType = (file: File): boolean => {
  return AllowedTypes.includes(file.type);
};

export const isValidFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE_MB * 1024 * 1024; 
};
  