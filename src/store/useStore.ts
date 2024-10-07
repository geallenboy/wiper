"use client";


import { create } from 'zustand';

interface FileStore {
    totalFiles: number;
    fileList: any[];
    teamId: string;
    setTeamId: (teamId: string) => void
    setTotalFiles: (total: number) => void;
    setFileList: (list: any[]) => void;

}

export const useFileStore = create<FileStore>((set) => ({
    totalFiles: 0,
    fileList: [],
    teamId: "",
    setTeamId: (id) => set({ teamId: id }),
    setTotalFiles: (total) => set({ totalFiles: total }),
    setFileList: (list) => set({ fileList: list }),
}));