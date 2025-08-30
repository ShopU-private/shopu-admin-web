import React, { useState, useRef } from 'react';
import { Category, CompositionItem, DosageForm } from '../../types/Product';

interface CreateProductProps {
  onBack: () => void;
}

const categoryOptions = Object.values(Category);
const dosageFormOptions = Object.values(DosageForm);

const initialComposition: CompositionItem = { name: '', strength: '' };

const CreateProduct: React.FC<CreateProductProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<{
    name: string;
    brand: string;
    manufacturerName: string;
    category: string;
    dosageForm: string;
    packSize: string;
    prescriptionRequired: boolean;
    description: string;
    ingredients: string;
    price: number;
    stock: number;
    images: string[]; // Explicitly type as string[]
    composition: CompositionItem[];
    strength: string;
    uses: string;
    benefits: string;
    howToUse: string;
    sideEffects: string;
    precautions: string;
    safetyAdvice: string;
    safetyInformation: string;
    storageInfo: string;
    disclaimer: string;
    hsnCode: string;
    manufacturerDetails: string;
    countryOfOrigin: string;
    expiryDate: string;
    manufacturingDate: string;
    discount: number;
  }>({
    name: '',
    brand: '',
    manufacturerName: '',
    category: '',
    dosageForm: '',
    packSize: '',
    prescriptionRequired: false,
    description: '',
    ingredients: '',
    price: 0,
    stock: 0,
    images: [],
    composition: [],
    strength: '',
    uses: '',
    benefits: '',
    howToUse: '',
    sideEffects: '',
    precautions: '',
    safetyAdvice: '',
    safetyInformation: '',
    storageInfo: '',
    disclaimer: '',
    hsnCode: '',
    manufacturerDetails: '',
    countryOfOrigin: '',
    expiryDate: '',
    manufacturingDate: '',
    discount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Composition logic
  const canAddComposition = formData.category !== Category.HEALTHCARE;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      // Type assertion to HTMLInputElement for checkbox
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (idx: number, value: string) => {
    const newImages = [...formData.images];
    newImages[idx] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const handleCompositionChange = (idx: number, field: keyof CompositionItem, value: string) => {
    const newCompositions = formData.composition.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setFormData((prev) => ({
      ...prev,
      composition: newCompositions
    }));
  };

  const addCompositionField = () => {
    setFormData((prev) => ({
      ...prev,
      composition: [...prev.composition, { ...initialComposition }]
    }));
  };

  const removeCompositionField = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      composition: prev.composition.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Creating product:', formData);
      setIsLoading(false);
      onBack();
    }, 1000);
  };

  // Image upload handlers
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(prevFiles => [
        ...prevFiles,
        ...Array.from(files).filter(
          file => !prevFiles.some(f => f.name === file.name && f.size === file.size)
        )
      ]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFiles(prevFiles => [
        ...prevFiles,
        ...Array.from(files).filter(
          file => !prevFiles.some(f => f.name === file.name && f.size === file.size)
        )
      ]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUploadImages = async () => {
    setUploading(true);
    // Simulate upload, replace with actual API call
    setTimeout(() => {
      // Simulate uploaded URLs
      const urls = selectedFiles.map(file => URL.createObjectURL(file));
      setUploadedImageUrls(urls);
      setFormData(prev => ({
        ...prev,
        images: urls
      }));
      setUploading(false);
    }, 1200);
  };

  const handleRemoveImage = (idx: number) => {
    const newUrls = uploadedImageUrls.filter((_, i) => i !== idx);
    setUploadedImageUrls(newUrls);
    setFormData(prev => ({
      ...prev,
      images: newUrls
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Required fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer Name *</label>
              <input
                type="text"
                name="manufacturerName"
                value={formData.manufacturerName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter manufacturer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dosage Form *</label>
              <select
                name="dosageForm"
                value={formData.dosageForm}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select dosage form</option>
                {dosageFormOptions.map((form) => (
                  <option key={form} value={form}>{form}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pack Size *</label>
              <input
                type="text"
                name="packSize"
                value={formData.packSize}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter pack size"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Required</label>
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Yes</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter product description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients *</label>
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter ingredients"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min={0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter discount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter discount"
              />
            </div>
          </div>

          {/* Optional fields (can be expanded as needed) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uses</label>
              <input
                type="text"
                name="uses"
                value={formData.uses}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter uses"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
              <input
                type="text"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter benefits"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How To Use</label>
              <input
                type="text"
                name="howToUse"
                value={formData.howToUse}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter how to use"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects</label>
              <input
                type="text"
                name="sideEffects"
                value={formData.sideEffects}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter side effects"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precautions</label>
              <input
                type="text"
                name="precautions"
                value={formData.precautions}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter precautions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Safety Advice</label>
              <input
                type="text"
                name="safetyAdvice"
                value={formData.safetyAdvice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter safety advice"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Safety Information</label>
              <input
                type="text"
                name="safetyInformation"
                value={formData.safetyInformation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter safety information"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage Info</label>
              <input
                type="text"
                name="storageInfo"
                value={formData.storageInfo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter storage info"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disclaimer</label>
              <input
                type="text"
                name="disclaimer"
                value={formData.disclaimer}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter disclaimer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">HSN Code</label>
              <input
                type="text"
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter HSN code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer Details</label>
              <input
                type="text"
                name="manufacturerDetails"
                value={formData.manufacturerDetails}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter manufacturer details"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country Of Origin</label>
              <input
                type="text"
                name="countryOfOrigin"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter country of origin"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
              <span className="text-gray-500 mb-2">Drag & drop images here, or click to select</span>
              {selectedFiles.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="relative flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="w-20 h-20 object-cover rounded-lg mb-1"
                      />
                      {/* <span className="text-xs text-gray-600">{file.name}</span> */}
                      <button
                        type="button"
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        className="bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== idx));
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={selectedFiles.length === 0 || uploading}
              onClick={handleUploadImages}
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
            {uploadedImageUrls.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {uploadedImageUrls.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img src={url} alt={`uploaded-${idx}`} className="w-20 h-20 object-cover rounded-lg" />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Composition Section - after images */}
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Composition</h2>
            <div>
              <button
                type="button"
                onClick={addCompositionField}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
                disabled={!canAddComposition}
              >
                + Add Composition Item
              </button>
              {!canAddComposition && (
                <div className="text-sm text-gray-500 mb-2">Composition is not required for Healthcare category.</div>
              )}
              {formData.composition.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => handleCompositionChange(idx, 'name', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Name"
                    disabled={!canAddComposition}
                  />
                  <input
                    type="text"
                    value={item.strength}
                    onChange={e => handleCompositionChange(idx, 'strength', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Strength"
                    disabled={!canAddComposition}
                  />
                  <button
                    type="button"
                    onClick={() => removeCompositionField(idx)}
                    className="px-3 py-2 text-red-600 hover:text-red-800"
                    disabled={!canAddComposition}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating...' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
