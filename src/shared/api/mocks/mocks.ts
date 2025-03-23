import { IDocumentRequest } from '../../types/apiTypes';

export const mockAuthData: Record<string, { token: string }> = {
  user1: { token: 'mocked_token_1' },
  user2: { token: 'mocked_token_2' },
  user3: { token: 'mocked_token_3' },
  user13: { token: 'mocked_token_13' },
};

let mockDocuments: IDocumentRequest[] = [
  {
    id: 1,
    companySigDate: '2023-10-12T08:30:00Z',
    companySignatureName: 'Company A',
    documentName: 'Contract 001',
    documentStatus: 'Approved',
    documentType: 'Contract',
    employeeNumber: '12345',
    employeeSigDate: '2023-10-12T10:00:00Z',
    employeeSignatureName: 'John Doe',
  },
  {
    id: 2,
    companySigDate: '2023-09-05T11:45:00Z',
    companySignatureName: 'Company B',
    documentName: 'Invoice 567',
    documentStatus: 'Pending',
    documentType: 'Invoice',
    employeeNumber: '67890',
    employeeSigDate: '2023-09-06T14:20:00Z',
    employeeSignatureName: 'Jane Smith',
  },
];

export const addMockDocument = (document: IDocumentRequest): IDocumentRequest => {
  const newDocument = { ...document, id: mockDocuments.length + 1 };
  mockDocuments.push(newDocument);
  return newDocument;
};

export const updateMockDocument = (
  id: number,
  updatedData: Partial<IDocumentRequest>
): IDocumentRequest | null => {
  const index = mockDocuments.findIndex((doc) => doc.id === id);
  if (index === -1) return null;

  mockDocuments[index] = { ...mockDocuments[index], ...updatedData };
  return mockDocuments[index];
};

export const deleteMockDocument = (id: number): boolean => {
  const initialLength = mockDocuments.length;
  mockDocuments = mockDocuments.filter((doc) => doc.id !== id);
  return mockDocuments.length < initialLength;
};

export const getMockDocuments = (): IDocumentRequest[] => [...mockDocuments];
