import React from 'react'

const DashboardSeller = async({params}: { params: { storeSlug: string } }) => {
    const { storeSlug } = await params;
    return (
    <div>
      Dashboard Seller {storeSlug}
    </div>
  )
}

export default DashboardSeller
