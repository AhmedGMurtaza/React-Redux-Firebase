import React from 'react';

const CustomersList = (props) => {
    console.log(props);
    return (<table>
        <thead>
            <tr>{props.headers.map(heading => <th key={heading}>{heading}</th>)}</tr>
        </thead>
        <tbody>
            {
                props.rows.map((row, index) =>
                    <tr key={index}>
                        <td key={row.customer_id}>{row.customer_id}</td>
                        <td key={row.customer_name}>{row.customer_name}</td>
                        <td key={row.phone}>{row.phone}</td>
                        <td key={row.email}>{row.email}</td>
                        <td key={row.address}>{row.address}</td>
                        <td key={row.city}>{row.city}</td>
                        <td key={row.fb_link}><a href={row.fb_link}>FB Profile</a></td>
                        <td key={row.references}>{row.references}</td>
                        <td key={row.phone+1}>
                            <a href={`/customers/${row.customer_key}/edit`} className="button button-success button-sm">edit</a>
                        </td>
                    </tr>)
            }
        </tbody>
    </table>);
}

export default CustomersList;