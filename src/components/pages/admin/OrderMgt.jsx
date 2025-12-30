import React from 'react'
import GenericTable from './GenericTable'
import { orderData, orderTable } from '../../../utils/Constants'

const OrderMgt = () => {
  return (
    <>
        {/* Orders Section */}
        <section>
            <GenericTable 
            title="Orders" 
            columns={orderTable} 
            data={orderData} 
            />
        </section>
    </>
  )
}

export default OrderMgt