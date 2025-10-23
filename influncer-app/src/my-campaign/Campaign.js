// src/campaigns/Campaign.js
import React, { useEffect, useState } from "react";
import "./Campaign.css";
import API_BASE_URL from "../apiconfig";

export default function Campaign() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const [formData, setFormData] = useState({
    campaignNumber: "",
    campaignName: "",
    brand: "",
    description: "",
  });

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    "";

  // tiny helper around fetch
  const apiFetch = async (path, options = {}) => {
    const { method = "GET", body } = options;
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await res.text(); // handle empty bodies safely
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const msg = data?.message || `Request failed (${res.status})`;
      throw new Error(msg);
    }
    return data;
  };

  // Load my campaigns
  useEffect(() => {
    (async () => {
      try {
        setListLoading(true);
        const data = await apiFetch("/users/campaigns");
        setCampaigns(data || []);
      } catch (e) {
        setError(e.message || "Failed to load campaigns.");
      } finally {
        setListLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () =>
    setFormData({
      campaignNumber: "",
      campaignName: "",
      brand: "",
      description: "",
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.campaignNumber.trim() ||
      !formData.campaignName.trim() ||
      !formData.brand.trim()
    ) {
      setError("Campaign Number, Campaign Name and Brand are required.");
      return;
    }

    try {
      setLoading(true);
      // createdByEmail is taken from JWT on the server
      const created = await apiFetch("/users/campaigns", {
        method: "POST",
        body: formData,
      });
      setCampaigns((prev) => [created, ...prev]);
      resetForm();
      setShowForm(false);
    } catch (e) {
      setError(e.message || "Failed to create campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="campaign-container">
      <div className="campaign-card">
        <div className="campaign-header">
          <h1>All Campaigns</h1>
          <button
            className="create-button"
            onClick={() => setShowForm((s) => !s)}
            disabled={!token}
            title={!token ? "Login required" : ""}
          >
            {showForm ? "Close" : "+ Create Campaign"}
          </button>
        </div>

        {showForm && (
          <form className="campaign-form" onSubmit={onSubmit}>
            <div className="two-col">
              <div className="form-group">
                <label>Campaign Number *</label>
                <input
                  type="text"
                  name="campaignNumber"
                  value={formData.campaignNumber}
                  onChange={onChange}
                  placeholder="e.g. CMP-001"
                />
              </div>
              <div className="form-group">
                <label>Campaign Name *</label>
                <input
                  type="text"
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={onChange}
                  placeholder="e.g. Diwali 2025 Awareness"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={onChange}
                placeholder="e.g. ACME"
              />
            </div>

            <div className="form-group">
              <label>Project Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={onChange}
                placeholder="Write a short description..."
              />
            </div>

            {error && <div className="error">{error}</div>}

            <div className="actions">
              <button type="button" className="btn ghost" onClick={resetForm}>
                Reset
              </button>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Saving..." : "Submit"}
              </button>
            </div>
          </form>
        )}

        <div className="campaign-list">
          {listLoading ? (
            <p className="muted">Loading campaigns...</p>
          ) : campaigns.length === 0 ? (
            <p className="empty-text">No campaigns available yet.</p>
          ) : (
            <ul className="campaign-ul">
              {campaigns.map((c) => (
                <li key={c._id} className="campaign-row">
                  <div className="row-top">
                    <span className="pill">{c.campaignNumber}</span>
                    <h3>{c.campaignName}</h3>
                  </div>
                  <div className="row-mid">
                    <strong>Brand:</strong> {c.brand}
                  </div>
                  <p className="desc">
                    {c.description?.trim() ? c.description : "—"}
                  </p>
                  <div className="row-bottom">
                    <span className="muted">Created by: {c.createdByEmail}</span>
                    <span className="muted">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
