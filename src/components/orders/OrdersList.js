import React from 'react';

const OrdersList = (props) => {
    const { headers, rows } = props;
    return (<table>
        <thead>
            <tr>{headers.map(heading => <th key={heading}>{heading}</th>)}</tr>
        </thead>
        <tbody>
            {
                rows.map((row, index) =>
                    <tr key={index}>
                        <td key={row.order_id}>{row.order_id}</td>
                        <td key={row.details}>{row.details}</td>
                        <td key={row.customer_id}>{row.customer_id}</td>
                        <td key={row.order_date}>{row.order_date}</td>
                        <td key={row.delivery_date}>{row.delivery_date}</td>
                        <td key={row.total}>{row.total}</td>
                        <td key={row.order_status}><p className={`label label-${row.order_status}`}>{row.order_status}</p></td>
                        <td key="action">
                            <a href={`/Orders/${row.order_key}/edit`} className="button button-success button-sm">edit</a>
                        </td>
                    </tr>)
            }
        </tbody>
    </table>);
}

export default OrdersList;
