import create from "zustand";

interface HeaderState {
  active: string;
  setActive: (id: string) => void;
}

const useHeaderStore = create<HeaderState>((set) => ({
  active: "",
  setActive: (id: string) => {
    // console.log("id : ", id);
    set({ active: id });
  },
}));

export default useHeaderStore;
