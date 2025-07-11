// src/types/types.ts


//api/projectAPi.ts
export type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  createdAt?: string;
  updatedAt?: string;

}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  summary: string;
  image: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// BlogFormModal.tsx
export type BlogFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => Promise<void>;
  initialData?: BlogFormData | null;
  onSubmitSuccess: () => void;
}

export type BlogFormData = {
    _id?: string;
  title: string;
  content: string;
  image: string;
  tags: string;
}

// projectFormModal.tsx
export type ProjectFormData = {
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
}

export type ProjectFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Project | null;
  onSubmitSuccess: () => void;
}

// types/ adminCetification
export type Certification = {
  _id: string;
  title: string;
  issuer: string;
  date: string; // ISO string for consistency
  link?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CertificationFormData = {
  title: string;
  issuer: string;
  date: string; // ISO string (input type="date")
  link: string | null;
  image: string | null;
}

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Certification | null;
  onSubmitSuccess: () => void;
}


// src/components/ui/Modal.tsx
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

//privateRoute.tsx
export type PrivateRouteProps = {
  children: React.ReactNode;
}

// Contact.tsx
export type FormData = {
  name: string;
  email: string;
  message: string;
}

// Testimonials.tsx
export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  image: string;
}



