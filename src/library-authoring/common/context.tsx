import { useToggle } from '@openedx/paragon';
import React from 'react';

export enum SidebarBodyComponentId {
  AddContent = 'add-content',
  Info = 'info',
  ComponentInfo = 'component-info',
}

export interface LibraryContextData {
  sidebarBodyComponent: SidebarBodyComponentId | null;
  closeLibrarySidebar: () => void;
  openAddContentSidebar: () => void;
  openInfoSidebar: () => void;
  openComponentInfoSidebar: (usageKey: string) => void;
  currentComponentUsageKey?: string;
  isCreateCollectionModalOpen: boolean;
  openCreateCollectionModal: () => void;
  closeCreateCollectionModal: () => void;
}

export const LibraryContext = React.createContext({
  sidebarBodyComponent: null,
  closeLibrarySidebar: () => {},
  openAddContentSidebar: () => {},
  openInfoSidebar: () => {},
  openComponentInfoSidebar: (_usageKey: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  isCreateCollectionModalOpen: false,
  openCreateCollectionModal: () => {},
  closeCreateCollectionModal: () => {},
} as LibraryContextData);

/**
 * React component to provide `LibraryContext`
 */
export const LibraryProvider = (props: { children?: React.ReactNode }) => {
  const [sidebarBodyComponent, setSidebarBodyComponent] = React.useState<SidebarBodyComponentId | null>(null);
  const [currentComponentUsageKey, setCurrentComponentUsageKey] = React.useState<string>();
  const [isCreateCollectionModalOpen, openCreateCollectionModal, closeCreateCollectionModal] = useToggle(false);

  const closeLibrarySidebar = React.useCallback(() => {
    setSidebarBodyComponent(null);
    setCurrentComponentUsageKey(undefined);
  }, []);
  const openAddContentSidebar = React.useCallback(() => {
    setCurrentComponentUsageKey(undefined);
    setSidebarBodyComponent(SidebarBodyComponentId.AddContent);
  }, []);
  const openInfoSidebar = React.useCallback(() => {
    setCurrentComponentUsageKey(undefined);
    setSidebarBodyComponent(SidebarBodyComponentId.Info);
  }, []);
  const openComponentInfoSidebar = React.useCallback(
    (usageKey: string) => {
      setCurrentComponentUsageKey(usageKey);
      setSidebarBodyComponent(SidebarBodyComponentId.ComponentInfo);
    },
    [],
  );

  const context = React.useMemo(() => ({
    sidebarBodyComponent,
    closeLibrarySidebar,
    openAddContentSidebar,
    openInfoSidebar,
    openComponentInfoSidebar,
    currentComponentUsageKey,
    isCreateCollectionModalOpen,
    openCreateCollectionModal,
    closeCreateCollectionModal,
  }), [
    sidebarBodyComponent,
    closeLibrarySidebar,
    openAddContentSidebar,
    openInfoSidebar,
    openComponentInfoSidebar,
    currentComponentUsageKey,
    isCreateCollectionModalOpen,
    openCreateCollectionModal,
    closeCreateCollectionModal,
  ]);

  return (
    <LibraryContext.Provider value={context}>
      {props.children}
    </LibraryContext.Provider>
  );
};
