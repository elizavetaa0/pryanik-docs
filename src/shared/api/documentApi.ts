import { IDocumentRequest } from '../types/apiTypes';
import {
  addMockDocument,
  deleteMockDocument,
  getMockDocuments,
  updateMockDocument,
} from './mocks/mocks';

const USE_MOCKS = true;

export const getDocuments = async (token: string): Promise<IDocumentRequest[]> => {
  if (USE_MOCKS) return getMockDocuments();

  const response = await fetch(`/real-api-url/docs/get`, {
    method: 'GET',
    headers: { 'x-auth': token },
  });

  if (!response.ok) throw new Error('Failed to fetch documents');
  return (await response.json()).data;
};

export const createDocument = async (
  token: string,
  data: IDocumentRequest
): Promise<IDocumentRequest> => {
  if (USE_MOCKS) return addMockDocument(data);

  const response = await fetch(`/real-api-url/docs/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth': token },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to create document');
  return (await response.json()).data;
};

export const updateDocument = async (
  token: string,
  id: number,
  data: Partial<IDocumentRequest>
): Promise<IDocumentRequest> => {
  if (USE_MOCKS) {
    const updatedDoc = updateMockDocument(id, data);
    if (!updatedDoc) throw new Error('Document not found');
    return updatedDoc;
  }

  const response = await fetch(`/real-api-url/docs/set/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-auth': token },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to update document');
  return (await response.json()).data;
};

export const deleteDocument = async (token: string, id: string): Promise<void> => {
  if (USE_MOCKS) {
    const success = deleteMockDocument(Number(id));
    if (!success) throw new Error('Error while deleting document');
    return;
  }

  const response = await fetch(`/real-api-url/docs/delete/${id}`, {
    method: 'POST',
    headers: { 'x-auth': token },
  });

  if (!response.ok) throw new Error('Failed to delete document');
  const result = await response.json();
  if (result.error_code !== 0) throw new Error('Error while deleting document');
};
