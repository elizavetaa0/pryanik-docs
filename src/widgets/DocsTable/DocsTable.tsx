import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store/store';
import {
  setDocuments,
  deleteDocument,
  updateDocument,
} from '../../entities/document/model/documentSlice';
import {
  getDocuments,
  createDocument,
  deleteDocument as apiDeleteDocument,
  updateDocument as apiUpdateDocument,
} from '../../shared/api/documentApi';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IDocumentRequest } from '../../shared/types/apiTypes';

export function DocsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { documents, loading, error } = useSelector((state: RootState) => state.document);
  const token = useSelector((state: RootState) => state.user.token);

  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    documentName: '',
    documentStatus: '',
    companySigDate: '',
    employeeSigDate: '',
  });
  const [editDoc, setEditDoc] = useState<IDocumentRequest | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (token) {
        try {
          const data = await getDocuments(token);
          dispatch(setDocuments(data));
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchDocuments();
  }, [token, dispatch]);

  const handleOpenDialog = (doc?: IDocumentRequest) => {
    if (doc) {
      setEditDoc(doc);
      setForm({
        documentName: doc.documentName,
        documentStatus: doc.documentStatus,
        companySigDate: doc.companySigDate,
        employeeSigDate: doc.employeeSigDate,
      });
    } else {
      setEditDoc(null);
      setForm({
        documentName: '',
        documentStatus: '',
        companySigDate: '',
        employeeSigDate: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditDoc(null);
  };
  const handleSave = async () => {
    if (!token) return;

    try {
      if (editDoc) {
        const updatedDoc: IDocumentRequest = {
          ...editDoc,
          ...form,
        };
        const response = await apiUpdateDocument(token, editDoc.id, updatedDoc);
        dispatch(updateDocument(response));
      } else {
        const newDoc: IDocumentRequest = {
          id: Date.now(),
          documentType: 'default',
          companySignatureName: 'Test Company',
          employeeNumber: '12345',
          employeeSignatureName: 'Test Employee',
          ...form,
        };
        const response = await createDocument(token, newDoc);
        dispatch(setDocuments([...documents, response]));
      }

      handleCloseDialog();
    } catch (err) {
      console.error('Ошибка при сохранении документа:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (token) {
      try {
        await apiDeleteDocument(token, id.toString());
        dispatch(deleteDocument(id));
      } catch (err) {
        console.error('Ошибка при удалении документа: ', err);
      }
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
      <Typography variant="h6" sx={{ paddingBottom: 2 }}>
        Таблица документов
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 2 }}
      >
        Добавить документ
      </Button>
      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: 'auto', padding: 3 }} />
      ) : error ? (
        <Typography color="error" variant="body1" sx={{ padding: 2 }}>
          Произошла ошибка при загрузке данных
        </Typography>
      ) : (
        <TableContainer>
          <Table aria-label="documents table">
            <TableHead>
              <TableRow>
                <TableCell>Название документа</TableCell>
                <TableCell>Статус документа</TableCell>
                <TableCell>Дата подписи компании</TableCell>
                <TableCell>Дата подписи сотрудника</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.documentName}</TableCell>
                  <TableCell>{doc.documentStatus}</TableCell>
                  <TableCell>{doc.companySigDate}</TableCell>
                  <TableCell>{doc.employeeSigDate}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenDialog(doc)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(doc.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editDoc ? 'Редактировать документ' : 'Добавить документ'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Название документа"
            fullWidth
            margin="dense"
            value={form.documentName}
            onChange={(e) => setForm({ ...form, documentName: e.target.value })}
          />
          <TextField
            label="Статус документа"
            fullWidth
            margin="dense"
            value={form.documentStatus}
            onChange={(e) => setForm({ ...form, documentStatus: e.target.value })}
          />
          <TextField
            label="Дата подписи компании"
            fullWidth
            margin="dense"
            value={form.companySigDate}
            onChange={(e) => setForm({ ...form, companySigDate: e.target.value })}
          />
          <TextField
            label="Дата подписи сотрудника"
            fullWidth
            margin="dense"
            value={form.employeeSigDate}
            onChange={(e) => setForm({ ...form, employeeSigDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            {editDoc ? 'Сохранить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
