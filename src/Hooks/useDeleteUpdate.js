import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAdmin, useAdminUpdate} from '../context/AdminContext';

export default function useDeleteUpdate(buttonName) {
	const navigate = useNavigate();
	var arrOfButtonName = buttonName.split('-');
	//context states for updating state after deleting
	const {postList, post, album, employee, albumList} = useAdmin();
	const {
		setPostList,
		setAlbum,
		setEmployee,
		setStaff,
		setButtonName,
		setAlbumList,
	} = useAdminUpdate();

	const url =
		process.env.NODE_ENV === 'production'
			? `${process.env.REACT_APP_BACKEND_URL}`
			: '';

	const deleteAlbum = async (album) => {
		try {
			console.log('Deleting with button', buttonName);
			console.log('Deleting item with id: ' + album.album_id);
			console.table(album);
			console.log('this is the album');
			const response = await axios.delete(
				`${url}/api/deleteAlbum/${album.album_id}/${album.originalSlug}`
			);

			if (response.status === 200) {
				setAlbum(() => {
					return {};
				});
				setButtonName(() => {
					return '';
				});
				setAlbumList((prev) =>
					prev.filter((item) => item.album_id !== album.album_id)
				);
			}

			console.log(response.status);
			console.log(response.data);
			navigate('/admin/galerie');
		} catch (error) {
			console.error(error);
			setButtonName(() => {
				return '';
			});
		} finally {
			setButtonName(() => {
				return '';
			});
		}
	};

	const updateAlbum = async (album) => {
		try {
			console.log('Updating with button', buttonName);
			console.log('Updating item with id: ' + album.album_id);
			console.table(album);
			const response = await axios.put(`${url}/api/updateAlbum`, album);
			setAlbum(() => {
				return {};
			});
			console.log(response.status);
			console.log(response.data);

			// Reload the window after 7 seconds
			setTimeout(() => {
				window.location.reload();
			}, 7000);
		} catch (error) {
			console.error(error);
		}
	};

	const deletePostItem = async (post) => {
		try {
			console.log(post.id);
			const idDeletion = await post.id;
			const response = await axios.delete(
				`${url}/api/deletePost/${idDeletion}`
			);
			if (response.status === 200) {
				setPostList((prev) => {
					return prev.filter((post) => {
						return post.id !== idDeletion;
					});
				});
			}
			console.log(response.status);
		} catch (error) {
			console.log(error.message);
		} finally {
			console.log('Deleted post with id: ' + post.id);
		}
		navigate('/admin/newPost/admin-posts');
	};

	const updatePostItem = async (post) => {
		try {
			console.log('Updating post with button', buttonName);
			console.log('Updating item with id: ' + post.id);
			// console.table(post);
			const response = await axios.put(`${url}/api/updatePost`, {
				id: post.id,
				userPass: post.user_name,
				title: post.title,
				text: post.post_text,
				slug: post.slug,
				post_updated: post.post_updated,
			});
			if (response.status === 200) {
				setPostList((prev) => {
					const updatedPostList = prev.map((item) => {
						if (item.id === post.id) {
							return {...item, ...post};
						} else {
							return item;
						}
					});
					return updatedPostList;
				});
				alert('Updating this data...', response.data);
				window.location.reload();
			}
		} catch (error) {
			console.log(error.message);
		}
		navigate('/admin/newPost/admin-posts');
	};

	const deleteEmployee = async (employee) => {
		setButtonName(() => {
			return '';
		});
		try {
			const idDelete = await employee.employee_id;
			const response = await axios.delete(
				`${url}/api/delete/employee/${idDelete}`
			);
			if (response.status === 200) {
				setStaff((prev) => {
					return prev.filter((employee) => {
						return employee.employee_id !== idDelete;
					});
				});

				if (employee.page !== undefined && employee.page === 'detail-page') {
					setTimeout(() => {
						navigate('/admin/zamestnanci');
					}, 2000);
				}
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			console.log(
				`Employee named ${employee.name} ${employee.surname} was deleted \nid: ${employee.employee_id}`
			);
		}
	};

	const updateEmployee = async (employee) => {
		try {
			const idUpdate = await employee.employee_id;
			const response = await axios.patch(
				`${url}/api/update/employee/${idUpdate}`,
				employee
			);
			if (response.status === 200) {
				console.log(response);
				alert(`${response.data.status}\n${response.data.message}`);
				navigate('/admin/zamestnanci');
			}
		} catch (error) {
			console.log(error);
			alert(`${error.data.status}\n${error.data.message}`);
		} finally {
			console.log(
				`Employee named ${employee.name} ${employee.surname} was UPDATED \nid: ${employee.employee_id}`
			);
		}
	};

	function updateOrDelete(id) {
		switch (arrOfButtonName[0]) {
			case 'post':
				return arrOfButtonName[1] === 'delete'
					? deletePostItem(post)
					: updatePostItem(post);

				break;

			case 'employee':
				return arrOfButtonName[1] === 'delete'
					? deleteEmployee(employee)
					: updateEmployee(employee);

				break;

			case 'album':
				return arrOfButtonName[1] === 'delete'
					? deleteAlbum(album)
					: updateAlbum(album);

			// case image and document
			case 'document':
				return arrOfButtonName[1] === 'delete'
					? console.log(document)
					: console.log(document);
			default:
				console.log(buttonName);
		}
	}

	return {updateOrDelete};
}
