import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { CouponCreateRequest } from "../../types/Coupon";

const CouponCreate: React.FC = () => {
  const navigate = useNavigate();
  const { fetchWithAuth } = useAuth();

  const [form, setForm] = useState<CouponCreateRequest>({
    code: "",
    title: "",
    description: "",
    discountPercentage: 0,
    discountAmount: 0,
    minOrderAmount: 0,
    requiredOrderCount: 0,
    startDate: null,
    endDate: null,
    isUpTo: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "discountAmount" ||
        name === "minOrderAmount" ||
        name === "requiredOrderCount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation
    if (!form.code.trim()) return alert("Coupon code is required");
    if (!form.title.trim()) return alert("Title is required");
    if (
      !form.discountPercentage &&
      !form.discountAmount
    )
      return alert("Discount value is required");
    if (!form.startDate) return alert("Start date is required");
    if (!form.endDate) return alert("End date is required");

    setIsLoading(true);
    try {
      const res = await fetchWithAuth("/coupon/create", {
        method: "POST",
        body: form,
        headers: { "Content-Type": "application/json" },
      });

      if (res?.success || res?.status === 201) {
        alert("Coupon created successfully!");
        navigate(-1);
      } else {
        alert(res?.message || "Failed to create coupon.");
      }
    } catch {
      alert("Error creating coupon.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Coupon</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code *
              </label>
              <input
                type="text"
                name="code"
                value={form.code ? form.code.toUpperCase() : ""} 
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter coupon code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage === 0 ? "" : form.discountPercentage}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discountPercentage: e.target.value === "" ? 0 : Number(e.target.value),
                  })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount %"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Amount *
              </label>
              <input
                type="number"
                name="discountAmount"
                value={form.discountAmount === 0 ? "" : form.discountAmount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discountAmount: e.target.value === "" ? 0 : Number(e.target.value),
                  })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter discount amount"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Amount
              </label>
              <input
                type="number"
                name="minOrderAmount"
                value={form.minOrderAmount === 0 ? "" : form.minOrderAmount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    minOrderAmount: e.target.value === "" ? 0 : Number(e.target.value),
                  })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Minimum order amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Order Count
              </label>
              <input
                type="number"
                name="requiredOrderCount"
                value={form.requiredOrderCount === 0 ? "" : form.requiredOrderCount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requiredOrderCount: e.target.value === "" ? 0 : Number(e.target.value),
                  })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Required order count"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid From *
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate ? form.startDate.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    startDate: new Date(e.target.value),
                  })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid To *
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate ? form.endDate.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate: new Date(e.target.value),
                  })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter coupon description"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponCreate;