import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createPost, deletePost, editPost, fetchPosts } from './postSlice';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Post } from '../../types/Post';
import { BasicDialogue } from '../../components/Dialogue';
import { PostForm } from './PostForm';
import { TabPanel, TabView } from 'primereact/tabview';
import { PdfViewer } from './PDFViewer';
import { Toast } from 'primereact/toast';
import { PostCard } from './PostCard';

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.posts);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: 'contains' },
    title: { value: null, matchMode: 'contains' },
    content: { value: null, matchMode: 'contains' },
  });

  const toast = useRef<Toast>(null);

  const [index, setActiveIndex] = useState<number>(0);
  const [openEdit, setEditOpen] = useState<boolean>(false);
  const [openDelete, setDeleteOpen] = useState<boolean>(false);

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const [actionablePost, setActionablePost] = useState<Post | undefined>();

  const [newPost, setNewPost] = useState<Post | undefined>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    showToast('error', 'Hubo un error', error ?? '');
  }, [error]);

  const showToast = (
    severity: 'error' | 'success' | 'info' | 'warn' | 'secondary' | 'contrast',
    summary: string = '',
    message: string = ''
  ) => {
    toast!.current!.show({
      severity: severity,
      summary: summary,
      detail: message,
    });
  };

  const handleEdit = () => {
    setEditOpen(false);
    dispatch(
      editPost({
        post: newPost!,
        onSuccess: (post?: Post) =>
          showToast('success', 'Edición exitosa', post?.title),
      })
    );
  };

  const handleCreate = () => {
    setOpenCreate(false);
    dispatch(
      createPost({
        post: { ...newPost!, id: items.length + 1 },
        onSuccess: (post?: Post) =>
          showToast('success', 'Creación exitosa', post?.title),
      })
    );
  };

  const handleChange = (data: Post) => {
    setNewPost(data);
  };

  const handleDelete = (data: Post) => {
    setDeleteOpen(false);
    dispatch(
      deletePost({
        id: actionablePost?.id!,
        onSuccess: (post?: Post) =>
          showToast('success', 'Eliminación exitosa', post?.title),
      })
    );
  };

  return (
    <div className='p-4'>
      <Toast ref={toast} />
      <TabView activeIndex={index} onTabChange={(e) => setActiveIndex(e.index)}>
        <TabPanel header={<h2>Publicaciones</h2>}>
          <div className='flex justify-content-end'>
            <Button
              icon='pi pi-plus'
              label='Crear nueva publicación'
              className='p-button-text'
              onClick={(e) => setOpenCreate(true)}
            />
          </div>
          <DataTable
            value={items ?? []}
            paginator
            rows={10}
            loading={loading}
            filters={filters}
            filterDisplay='row'
            globalFilterFields={['title', 'content']}
          >
            <Column field='id' header='ID' sortable />
            <Column
              field='title'
              header='Título'
              sortable
              filter
              filterPlaceholder='Buscar título'
            />
            <Column field='body' header='Contenido' />
            <Column
              body={(rowData) => (
                <>
                  <Button
                    icon='pi pi-pencil'
                    className='p-button-text'
                    onClick={() => {
                      setActionablePost(rowData);
                      setEditOpen(true);
                    }}
                  />
                  <Button
                    icon='pi pi-trash'
                    className='p-button-danger p-button-text'
                    onClick={() => {
                      setActionablePost(rowData);
                      setDeleteOpen(true);
                    }}
                  />
                  <Button
                    icon='pi pi-eye'
                    className='p-button-text'
                    onClick={() => {
                      setActionablePost(rowData);
                      setActiveIndex(2);
                    }}
                  />
                </>
              )}
            />
          </DataTable>
          <BasicDialogue
            header=''
            setVisible={() => setEditOpen(false)}
            visible={openEdit}
            handleConfirm={handleEdit}
            handleCancel={() => setEditOpen(false)}
            description=''
            confirmationText='Guardar'
            cancelText='Cancelar'
          >
            <PostForm
              onSubmit={handleEdit}
              initial={actionablePost}
              handleChange={handleChange}
            ></PostForm>
          </BasicDialogue>
          <BasicDialogue
            header=''
            setVisible={() => setOpenCreate(false)}
            visible={openCreate}
            handleConfirm={handleCreate}
            handleCancel={() => setOpenCreate(false)}
            description=''
            confirmationText='Guardar'
            cancelText='Cancelar'
          >
            <PostForm
              onSubmit={handleCreate}
              handleChange={handleChange}
            ></PostForm>
          </BasicDialogue>
          <BasicDialogue
            header='Eliminar post'
            setVisible={() => setDeleteOpen(false)}
            visible={openDelete}
            handleConfirm={handleDelete}
            handleCancel={() => setDeleteOpen(false)}
            description='Estás seguro de que deseas eliminar este post?'
            confirmationText='Si, eliminar'
            cancelText='No, cancelar'
          >
            <></>
          </BasicDialogue>
        </TabPanel>
        <TabPanel header={<h2>PDF Viewer</h2>}>
          <PdfViewer
            url={
              'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf'
            }
          />
        </TabPanel>
        <TabPanel header={<h2>Detail</h2>}>
          <PostCard post={actionablePost!}></PostCard>
        </TabPanel>
      </TabView>
    </div>
  );
};
